interface Request {
  body: {
    email: string;
    password: string;
  };
}

interface Response {
  status: (code: number) => {
    send: (body: { message: string }) => void;
  };
}

const backend = process.env.BACKEND_URL as string;

export const authenticateUser = async (req: Request, res: Response) => {
    
};
