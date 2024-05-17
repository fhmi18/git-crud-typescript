import { Request, Response } from 'express';

const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    message: 'URL Not found',
  });
};

export default notFound;
