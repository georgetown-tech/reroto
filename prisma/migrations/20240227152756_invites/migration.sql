-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "role" INTEGER,
    "siteId" TEXT,
    "creatorId" TEXT,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
