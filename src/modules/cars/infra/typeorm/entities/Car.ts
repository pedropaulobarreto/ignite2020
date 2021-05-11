import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import Category from "./Category";

@Entity("cars")
export default class Car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column({ default: true })
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column({ nullable: true })
  category_id: string;

  @ManyToOne(() => Category, (category) => category.id, {
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @CreateDateColumn({ default: "now()" })
  created_at: Date;
}
