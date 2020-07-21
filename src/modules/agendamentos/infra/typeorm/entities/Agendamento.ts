import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Usuario from '@modules/usuarios/infra/entities/Usuario';

@Entity('agendamentos')
class Agendamentos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  prestador_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'prestador_id' })
  prestador: Usuario;

  @Column('timestamp with time zone')
  data: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Agendamentos;
