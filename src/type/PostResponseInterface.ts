export interface PostResponseInterface {
  _id: string;
  createdOn: string;
  title: string;
  coverImage: {
    fileName: string;
    publicId: string;
    url: string;
  };
  description: string;
}
