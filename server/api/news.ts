
import * as contentful from "contentful";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';


// const config = {
//   space: runtimeConfig.public.spaceId,
//   accessToken: runtimeConfig.public.accessToken,
//   host: runtimeConfig.public.host,
// };

interface News {
  title: string
  createdAt: string
  body?: string
}

const config = {
  space: process.env?.NUXT_SPACE_ID,
  accessToken: process.env?.NUXT_ACCESS_TOKEN,
  host: process.env?.NUXT_HOST,
};

const createClient = contentful.createClient
  ? contentful.createClient(config)
  : contentful.default.createClient(config)


const client = createClient

const buildEntryByContentful = (item: any): News => {
  return {
    title: item.fields.title,
    createdAt: item.fields.date
      ? item.fields.date
      : item.fields.createdAt,
    body: documentToHtmlString(item.fields.body)
  }
}

export default defineEventHandler(async (event) => {
  try {
   const { items } = await client.getEntries({
      content_type: 'news',
      order: '-fields.date',
      limit: 10
    });
    return items.map(item => buildEntryByContentful(item))
  } catch (e) {
    return [];
  }
})
