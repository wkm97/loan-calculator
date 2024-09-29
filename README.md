# Loan Calculator and Application

https://github.com/user-attachments/assets/840412ec-9599-4994-b81e-d3dacdc86a19

## How to Run
```bash

cp backend/.env.example backend/.env # Change the MONGODB_URI to your own connection
cp frontend/.env.example frontend/.env
npm ci
npm run --workspace=shared build
npm run --workspace=backend dev
npm run --workspace=frontend dev

```

## Notes
### Shared Library
- options data for nationality and job industry
- validation that can be used in frontend and backend using zod

### Frontend
- use reactjs with shadcn/ui
- use shadcn/ui for fast setup and ready to use component which relatively easy for customization
- customized the input to accept adornment
- customized toaster to show success notification
- easy to implement theme switching with color palette for light theme and dark theme
- come with form component that work with react-hook-form
- date picker for date of birth
- [customized date picker to allow year picker for better navigation](https://github.com/shadcn-ui/ui/pull/4421)

### Backend
- use expressjs
- save loan application to mongodb using mongoose orm
- use zod to validate the loan application request body using the same schema in shared library
