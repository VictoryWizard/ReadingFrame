export type TocItem = { id: string; label: string };

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image: string;
  imageAlt?: string;
  topics: string[];
  readingMinutes?: number;
  takeaways: string[];
  toc: TocItem[];
  related?: string[];
  paper?: {
    title?: string;
    authors?: string;
  };
};

export type Post = PostFrontmatter & {
  content: string;
};

export type TopicMeta = {
  slug: string;
  name: string;
  description: string;
};
