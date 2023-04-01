import slugify from 'slugify';
import { Request } from 'express';
import Wish from '../models/Wish';

class WishService {
  body: Request['body'];
  params: Request['params'];

  constructor(req: Request) {
    this.body = req.body;
    this.params = req.params;
  }

  getAll = async () => {
    const wishes = await Wish.find({});
    return wishes;
  };

  store = async () => {
    const { name, body } = this.body;
    const slug = slugify(name, { lower: true });
    const wish = await Wish.create({ name, slug, body });
    return wish;
  };

  getOne = async () => {
    const { slug } = this.params;
    const wish = await Wish.findOne({ slug });
    if (!wish) throw Error('Wish not found');
    return wish;
  };

  update = async () => {
    const { slug } = this.params;
    const { name, body } = this.body;
    const newSlug = slugify(name, { lower: true });

    const newWish = { slug: newSlug, name, body };
    const wish = await Wish.findOneAndUpdate({ slug }, newWish);
    if (!wish) throw Error('Wish not found');

    return newWish;
  };

  destroy = async () => {
    const { slug } = this.params;

    const wish = await Wish.findOneAndDelete({ slug });
    if (!wish) throw Error('Wish not found');

    return wish;
  };
}

export default WishService;
