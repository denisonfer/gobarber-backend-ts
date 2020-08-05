interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      nome: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'denison.shenry@gmail.com',
      nome: 'Denison do GoBarber',
    },
  },
} as IMailConfig;
