
import * as contentful from "contentful";
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';


// const config = {
//   space: runtimeConfig.public.spaceId,
//   accessToken: runtimeConfig.public.accessToken,
//   host: runtimeConfig.public.host,
// };

export interface Games {
  contents: string
  date: string
}

const options: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ({
      data: {
        target: { fields }
      }
    }) => `<img src="${fields ? fields.file.url : ''}?w=1200"/>`,
    [INLINES.HYPERLINK]: (node, next) => {
      return `<a href="${node.data.uri}"${' target="_blank"'}>${next(
        node.content
      )}</a>`
    }
  }
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

const buildEntryByContentful = (item: any): Games => {
  return {
    date: item.fields.date
      ? item.fields.date
      : item.fields.createdAt,
    contents: documentToHtmlString(item.fields.contents, options)
  }
}

export default defineEventHandler(async (event) => {
  try {
   const { items } = await client.getEntries({
      content_type: 'games',
      order: '-fields.date',
      limit: 1
    });
    return items.map(item => buildEntryByContentful(item))
  } catch (e) {
    return []
  }
})
