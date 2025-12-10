export type User = {
  id: number;
  name: string;
  email: string;
  email_verified: boolean;
  created_at: string;
  access_tokens: {
    access: string;
    refresh: string;
  };
};
