-- AlterTable
CREATE SEQUENCE board_priority_seq;
ALTER TABLE "Board" ALTER COLUMN "priority" SET DEFAULT nextval('board_priority_seq'),
ALTER COLUMN "userId" DROP NOT NULL;
ALTER SEQUENCE board_priority_seq OWNED BY "Board"."priority";
