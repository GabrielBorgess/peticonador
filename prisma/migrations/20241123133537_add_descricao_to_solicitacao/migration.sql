/*
  Warnings:

  - Added the required column `desciption` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "Assistido_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Solicitacao_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "Solicitacao" ADD COLUMN     "desciption" STRING NOT NULL;
