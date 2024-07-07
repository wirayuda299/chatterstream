const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const users = [
  {
    id: "f2f43b4a-ecf5-45a3-8b85-65f5dcce5b74",
    username: "user1",
    email: "user1@example.com",
    bio: "Bio of user1",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user1"
  },
  {
    id: "57fa7ba8-f2ef-44c8-8c23-8bffba7dc84e",
    username: "user2",
    email: "user2@example.com",
    bio: "Bio of user2",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user2"
  },
  {
    id: "e3d5c45a-9e67-4cfa-8e8f-3b83342fc5e9",
    username: "user3",
    email: "user3@example.com",
    bio: "Bio of user3",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user3"
  },
  {
    id: "cb9d4781-18ed-4316-b8a8-8b7398d8fadc",
    username: "user4",
    email: "user4@example.com",
    bio: "Bio of user4",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user4"
  },
  {
    id: "a9373d62-9ef6-47b7-8595-8f6f4b4f7f6d",
    username: "user5",
    email: "user5@example.com",
    bio: "Bio of user5",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user5"
  },
  {
    id: "d2e8a7f6-4eab-4d1b-9f7e-5e3b4d7b8f8d",
    username: "user6",
    email: "user6@example.com",
    bio: "Bio of user6",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user6"
  },
  {
    id: "f6b8e9d1-7e4b-429d-8e4d-8d8f7f4b8e6d",
    username: "user7",
    email: "user7@example.com",
    bio: "Bio of user7",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user7"
  },
  {
    id: "e4a7f3b6-9f2d-489f-8e7d-8e3f7d8f7e7d",
    username: "user8",
    email: "user8@example.com",
    bio: "Bio of user8",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user8"
  },
  {
    id: "f7e6b8f4-2e9b-4e1d-9e6d-7d8f7e3d8f7d",
    username: "user9",
    email: "user9@example.com",
    bio: "Bio of user9",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user9"
  },
  {
    id: "d9e4b6f8-3e2d-4e8f-9f6d-8d7f7e3b8f7d",
    username: "user10",
    email: "user10@example.com",
    bio: "Bio of user10",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user10"
  },
  {
    id: "f7b8d6e1-4e7b-4e9d-8e6d-8d7f7e4b8e6d",
    username: "user11",
    email: "user11@example.com",
    bio: "Bio of user11",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user11"
  },
  {
    id: "e4b6d7f8-9e3d-4e1f-8e6d-8d7f7e4b8e6d",
    username: "user12",
    email: "user12@example.com",
    bio: "Bio of user12",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user12"
  },
  {
    id: "d7e8b6f4-9e4d-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user13",
    email: "user13@example.com",
    bio: "Bio of user13",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user13"
  },
  {
    id: "f9d8b7e1-4e2b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user14",
    email: "user14@example.com",
    bio: "Bio of user14",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user14"
  },
  {
    id: "e7d9b8f1-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user15",
    email: "user15@example.com",
    bio: "Bio of user15",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user15"
  },
  {
    id: "f8b7e9d1-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user16",
    email: "user16@example.com",
    bio: "Bio of user16",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user16"
  },
  {
    id: "e9d8b7f4-9e2b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user17",
    email: "user17@example.com",
    bio: "Bio of user17",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user17"
  },
  {
    id: "d8e7b9f1-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user18",
    email: "user18@example.com",
    bio: "Bio of user18",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user18"
  },
  {
    id: "f7d9e8b1-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user19",
    email: "user19@example.com",
    bio: "Bio of user19",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user19"
  },
  {
    id: "e8d7b9f4-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user20",
    email: "user20@example.com",
    bio: "Bio of user20",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user20"
  },
  {
    id: "d9f8b7e1-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user21",
    email: "user21@example.com",
    bio: "Bio of user21",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user21"
  },
  {
    id: "f8e7d9b1-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user22",
    email: "user22@example.com",
    bio: "Bio of user22",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user22"
  },
  {
    id: "e9d8b7f4-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user23",
    email: "user23@example.com",
    bio: "Bio of user23",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user23"
  },
  {
    id: "d7f8e9b1-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user24",
    email: "user24@example.com",
    bio: "Bio of user24",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user24"
  },
  {
    id: "f7d8e9b1-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user25",
    email: "user25@example.com",
    bio: "Bio of user25",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user25"
  },
  {
    id: "e8f7d9b1-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user26",
    email: "user26@example.com",
    bio: "Bio of user26",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user26"
  },
  {
    id: "d9e8b7f1-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user27",
    email: "user27@example.com",
    bio: "Bio of user27",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user27"
  },
  {
    id: "f8d7e9b1-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user28",
    email: "user28@example.com",
    bio: "Bio of user28",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user28"
  },
  {
    id: "e7d8b9f4-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user29",
    email: "user29@example.com",
    bio: "Bio of user29",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user29"
  },
  {
    id: "d8e9b7f1-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user30",
    email: "user30@example.com",
    bio: "Bio of user30",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user30"
  },
  {
    id: "f9d8b7e1-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user31",
    email: "user31@example.com",
    bio: "Bio of user31",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user31"
  },
  {
    id: "e7d9b8f1-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user32",
    email: "user32@example.com",
    bio: "Bio of user32",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user32"
  },
  {
    id: "d8e7b9f4-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user33",
    email: "user33@example.com",
    bio: "Bio of user33",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user33"
  },
  {
    id: "f8d7e9b1-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user34",
    email: "user34@example.com",
    bio: "Bio of user34",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user34"
  },
  {
    id: "e7d8b9f4-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user35",
    email: "user35@example.com",
    bio: "Bio of user35",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user35"
  },
  {
    id: "d8e9b7f1-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user36",
    email: "user36@example.com",
    bio: "Bio of user36",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user36"
  },
  {
    id: "f8d7e9b1-4e7b-4e8d-8f6d-8d7f7e4b8e6d",
    username: "user37",
    email: "user37@example.com",
    bio: "Bio of user37",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user37"
  },
  {
    id: "e7d9b8f4-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user38",
    email: "user38@example.com",
    bio: "Bio of user38",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user38"
  },
  {
    id: "d8e9b7f4-4e7b-4e8d-8e6d-8d7f7e4b8e6d",
    username: "user39",
    email: "user39@example.com",
    bio: "Bio of user39",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user39"
  },
  {
    id: "f8d7e9b1-4e7b-4e1d-8e6d-8d7f7e4b8e6d",
    username: "user40",
    email: "user40@example.com",
    bio: "Bio of user40",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaWJhZmlwNnltN3ptaThRNk9RZVlUSHVzbEoifQ",
    link: "https://example.com/user40"
  }
]



async function main() {
  await prisma.user
    .createMany({
      data: users,
      skipDuplicates: true
    })
    .then(() => console.log("user created"));
}

main();
