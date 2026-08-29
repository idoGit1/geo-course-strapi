import type { Schema, Struct } from '@strapi/strapi';

export interface AssignmentOption extends Struct.ComponentSchema {
  collectionName: 'components_assignment_options';
  info: {
    displayName: 'Option';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface ContentReadingPart extends Struct.ComponentSchema {
  collectionName: 'components_content_reading_parts';
  info: {
    displayName: 'ReadingPart';
    icon: 'message';
  };
  attributes: {
    content: Schema.Attribute.Text;
    tags: Schema.Attribute.Component<'helpers.tag', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContentVideo extends Struct.ComponentSchema {
  collectionName: 'components_content_videos';
  info: {
    displayName: 'Video';
    icon: 'play';
  };
  attributes: {
    description: Schema.Attribute.Text;
    duration: Schema.Attribute.String;
    title: Schema.Attribute.String;
    youtubeId: Schema.Attribute.String;
  };
}

export interface HelpersTag extends Struct.ComponentSchema {
  collectionName: 'components_helpers_tags';
  info: {
    displayName: 'Tag';
    icon: 'information';
  };
  attributes: {
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'assignment.option': AssignmentOption;
      'content.reading-part': ContentReadingPart;
      'content.video': ContentVideo;
      'helpers.tag': HelpersTag;
    }
  }
}
