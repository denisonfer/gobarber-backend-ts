import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

@Entity('agendamentos')
class Agendamentos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  prestador_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'prestador_id' })
  prestador: Usuario;

  @Column()
  usuario_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column('timestamp with time zone')
  data: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Agendamentos;
