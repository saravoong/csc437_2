export interface Story {
    "img-src": string;
    authorName: string;
    genre: string;
    chapterCount: number;
    storyTitle: string;
    communityOrOfficial: string;
    storyLink: string;
    storyPath: string;
    synopsis: string;
    chapters: Chapter[];
    reviews: Review[];
}

export interface Comment {
    username: string;
    text: string;
    date: Date | string;
}

export interface Chapter {
    storyTitle: string;
    chapterNumber: number;
    title: string;
    href: string;
    summary: string;
    comments: Comment[];
}

export interface Reader {
    username: string;
    profilePicture: string | undefined;
    color: string | undefined;
}

export interface Review {
    username: string;
    rating: number;
    comment: string;
    date?: Date | string;
}