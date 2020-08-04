import {
  Entity,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notificacoes')
class Notificacao {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  conteudo: string;

  @Column('uuid')
  id_receptor: string;

  @Column({ default: false })
  lido: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notificacao;
