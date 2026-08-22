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

export interface AssignmentQuestion extends Struct.ComponentSchema {
  collectionName: 'components_assignment_questions';
  info: {
    displayName: 'Question';
    icon: 'question';
  };
  attributes: {
    options: Schema.Attribute.Component<'assignment.option', true>;
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['open', 'closed']>;
  };
}

export interface ContentAssignment extends Struct.ComponentSchema {
  collectionName: 'components_content_assignments';
  info: {
    displayName: 'Assignment';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    difficulty: Schema.Attribute.Enumeration<
      ['easy', 'medium', 'hard', 'extreme']
    >;
    questions: Schema.Attribute.Component<'assignment.question', true>;
    title: Schema.Attribute.String;
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
      'assignment.question': AssignmentQuestion;
      'content.assignment': ContentAssignment;
      'content.reading-part': ContentReadingPart;
      'content.video': ContentVideo;
      'helpers.tag': HelpersTag;
    }
  }
}
