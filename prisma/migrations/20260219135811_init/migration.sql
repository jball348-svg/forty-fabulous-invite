-- CreateTable
CREATE TABLE "rsvps" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "attending" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rsvps_pkey" PRIMARY KEY ("id")
);
