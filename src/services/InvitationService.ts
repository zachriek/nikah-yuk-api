import slugify from 'slugify';
import Invitation from '../models/Invitation';
import User, { IUserAuthRequest } from '../models/User';
import cloudinary from '../utils/Cloudinary';

class InvitationService {
  body: IUserAuthRequest['body'];
  params: IUserAuthRequest['params'];
  query: IUserAuthRequest['query'];
  user: IUserAuthRequest['user'];

  constructor(req: IUserAuthRequest) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
    this.user = req.user;
  }

  getAll = async () => {
    const page = Number(this.query.page) - 1 || 0;
    const limit = Number(this.query.limit) || 5;
    const search = this.query.search || '';

    let options = { slug: { $regex: search, $options: 'i' } };

    const invitations = await Invitation.find(options)
      .sort([['updatedAt', 'desc']])
      .skip(page * limit)
      .limit(limit);
    const total = await Invitation.countDocuments(options);

    return { invitations, total, page: page + 1, limit };
  };

  store = async () => {
    const { groom, bride, date, messages, galleries } = this.body;

    if (galleries) {
      const result = galleries.forEach(async (gallery: any) => {
        await cloudinary.v2.uploader.upload(gallery, {
          folder: 'galleries',
        });
      });
      galleries.push(result);
    }

    const isExist = await Invitation.findOne({ userId: this.user._id });
    if (isExist) throw Error('You already made the invitation');

    const slug = slugify(`${groom.username} ${bride.username}`, { lower: true });

    const invitation = await Invitation.create({ userId: this.user._id, slug, groom, bride, date, messages, galleries });

    return invitation;
  };

  getOne = async () => {
    const { slug } = this.params;

    const invitation = await Invitation.findOne({ slug });
    if (!invitation) throw Error('Invitation not found');

    return invitation;
  };

  update = async () => {
    const { slug } = this.params;
    const { groom, bride, date, messages, galleries } = this.body;
    const newSlug = slugify(`${groom.username} ${bride.username}`, { lower: true });

    const newInvitation = { slug: newSlug, groom, bride, date, messages, galleries };
    const invitation = await Invitation.findOneAndUpdate({ slug }, newInvitation);
    if (!invitation) throw Error('Invitation not found');

    return newInvitation;
  };

  destroy = async () => {
    const { slug } = this.params;

    const invitation = await Invitation.findOneAndDelete({ slug });
    if (!invitation) throw Error('Invitation not found');

    return invitation;
  };
}

export default InvitationService;
