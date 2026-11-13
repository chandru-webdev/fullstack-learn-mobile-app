export type Resource = {
  title: string;
  url: string;
  platform: string;
};

export type Lesson = {
  id: string;
  title: string;
  items: string[];
  hours?: string;
  where?: string;
};

export type Topic = {
  id: string;
  number?: number;
  title: string;
  nav: string;
  category: string;
  blurb: string;
  hoursLabel: string;
  lessonCount: number;
  itemCount: number;
  resources: Resource[];
  lessons: Lesson[];
  featured?: boolean;
};

export type TaskProgress = {
  completed: boolean;
  todayILearned: boolean;
};

export type UserProgress = Record<string, TaskProgress>;

export type MockUser = {
  username: string;
  password: string;
  createdAt: string;
  provider?: 'password' | 'google';
  email?: string;
};
