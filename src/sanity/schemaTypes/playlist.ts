import { defineField, defineType } from 'sanity';

export const playlist = defineType({
  name: 'playlist',
  title: 'Playlist',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'author', type: 'reference', to: { type: 'author' } }),
    defineField({ name: 'select', type: 'array', of: [{ type: 'reference', to: { type: 'startup' } }] }),

  ],
});
