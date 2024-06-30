# Image Gallery App

This is an image gallery application built with modern web technologies. It allows users to upload, view, and manage images in a responsive gallery format.

## Technologies Used

- [T3 Stack](https://create.t3.gg/)
- [Next.js](https://nextjs.org/) with App Router
- [tRPC](https://trpc.io/) for type-safe API
- [TanStack Query](https://tanstack.com/query/latest) for data fetching
- [UploadThing](https://uploadthing.com/) for image uploads
- [Neon](https://neon.tech/) for PostgreSQL database
- [Prisma](https://www.prisma.io/) as ORM
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [TailwindCSS](https://tailwindcss.com/) for styling

## Prerequisites

Before you begin, ensure you have the following:

- Node.js (v18 or later)
- npm or yarn
- Git

## Setup Instructions

1. Clone the repository:
   $ git clone git@github.com:Lusimba/GalleryApp.git
   $ cd GalleryApp

2. Install dependencies:
   $ npm install

## Additional Setup

### Neon Database

1. Create an account at [Neon](https://neon.tech/)
2. Create a new project and database
3. Copy the connection string to your `.env` file

### Google Auth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project and set up OAuth 2.0 credentials
3. Add the Client ID and Client Secret to your `.env` file

### UploadThing

1. Create an account at [UploadThing](https://uploadthing.com/)
2. Create a new project
3. Copy the API key and App ID to your `.env` file

### Generate your NEXTAUTH_SECRET

    $ openssl rand -base64 32

4. Set up environment variables:

- Create a `.env` file in the root directory
- Add the following variables. Replace the placeholders with actual values (.env and .env.local):
  ```
  DATABASE_URL="your-neon-database-url"
  GOOGLE_CLIENT_ID="your-google-client-id"
  GOOGLE_CLIENT_SECRET="your-google-client-secret"
  UPLOADTHING_SECRET="your-uploadthing-secret"
  UPLOADTHING_APP_ID="your-uploadthing-app-id"
  NEXTAUTH_SECRET="your-nextauth-secret"
  ```

4. Set up the database:
   $ npx prisma db push

5. Run the development server:
   $ npm run dev

The app should now be running on `http://localhost:3000`

## Deployment

To build the app for production:
$ npm run build

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
