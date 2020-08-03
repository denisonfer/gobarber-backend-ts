import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddIdUsuarioNoAgendamento1596468715990
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'agendamentos',
      new TableColumn({
        name: 'usuario_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'agendamentos',
      new TableForeignKey({
        name: 'agendamentosUsuario',
        columnNames: ['usuario_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('agendamentos', 'agendamentosPrestador');

    await queryRunner.dropColumn('agendamentos', 'usuario_id');
  }
}
