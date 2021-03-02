import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('taxonomy')
export class taxonomy {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { name: 'imagen', nullable: true, length: 1024 })
  imagen: string | null;

  @Column('character varying', { name: 'reino', nullable: true, length: 1024 })
  reino: string | null;

  @Column('character varying', { name: 'filo', nullable: true, length: 1024 })
  filo: string | null;

  @Column('character varying', { name: 'clases', nullable: true, length: 1024 })
  clases: string | null;

  @Column('character varying', { name: 'orden', nullable: true, length: 1024 })
  orden: string | null;

  @Column('character varying', {
    name: 'familia',
    nullable: true,
    length: 1024,
  })
  familia: string | null;

  @Column('character varying', { name: 'genero', nullable: true, length: 1024 })
  genero: string | null;

  @Column('character varying', {
    name: 'especie',
    nullable: true,
    length: 1024,
  })
  especie: string | null;

  @Column('character varying', {
    name: 'comun',
    nullable: true,
    length: 1024,
  })
  nombreComun: string | null;

  @Column('character varying', {
    name: 'categoria',
    nullable: true,
    length: 1024,
  })
  categoria: string | null;

  @Column('character varying', {
    name: 'infraespecifico',
    nullable: true,
    length: 1024,
  })
  epitetoInfraespecifico: string | null;

  @Column('character varying', {
    name: 'rango_taxonomico',
    nullable: true,
    length: 1024,
  })
  rangoTaxonomico: string | null;

  @Column('character varying', {
    name: 'nombre_cientifico',
    nullable: true,
    length: 1024,
  })
  nombreCientifico: string | null;

  @Column('character varying', {
    name: 'nombre_cientifico_literal',
    nullable: true,
    length: 1024,
  })
  nombreCientificoLiteral: string | null;

  @Column('character varying', {
    name: 'autoria_literal_nombre_cientifico',
    nullable: true,
    length: 1024,
  })
  autoriaLiteralNombreCientifico: string | null;

  @Column('character varying', {
    name: 'codigo_pais',
    nullable: true,
    length: 1024,
  })
  codigoPais: string | null;

  @Column('character varying', {
    name: 'localidad',
    nullable: true,
    length: 1024,
  })
  localidad: string | null;

  @Column('character varying', {
    name: 'provincia_estado',
    nullable: true,
    length: 1024,
  })
  provinciaEstado: string | null;

  @Column('character varying', {
    name: 'latitude',
    nullable: true,
    length: 1024,
  })
  latitude: string | null;

  @Column('character varying', {
    name: 'longitude',
    nullable: true,
    length: 1024,
  })
  longitude: string | null;

  @Column('character varying', {
    name: 'eventdate',
    nullable: true,
    length: 1024,
  })
  eventdate: string | null;

  @Column('integer', { name: 'day', nullable: true })
  day: number | null;

  @Column('integer', { name: 'month', nullable: true })
  month: number | null;

  @Column('integer', { name: 'year', nullable: true })
  year: number | null;

  @Column('character varying', {
    name: 'basisofrecord',
    nullable: true,
    length: 1024,
  })
  basisofrecord: string | null;

  @Column('character varying', {
    name: 'institution_code',
    nullable: true,
    length: 1024,
  })
  institutioncode: string | null;

  @Column('character varying', {
    name: 'identifiedby',
    nullable: true,
    length: 1024,
  })
  identifiedby: string | null;

  @Column('character varying', {
    name: 'date_identified',
    nullable: true,
    length: 1024,
  })
  dateIdentified: string | null;

}
