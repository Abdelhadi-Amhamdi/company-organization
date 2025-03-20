# Airtable React Data Viewer

A modern React application for fetching, displaying, searching, and filtering Airtable data in a clean, interactive table interface.

## Features

- **Airtable Integration**: Seamlessly connects to your Airtable base
- **Data Display**: Presents your data in a well-structured, responsive table
- **Search Functionality**: Quickly find specific data across all fields
- **Advanced Filtering**: Filter data based on multiple criteria
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Fast Performance**: Developed using Vite for optimal development experience

## Tech Stack

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Airtable API](https://airtable.com/developers/web/api/introduction) - Data source

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- An Airtable account with API access

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdelhadi-Amhamdi/company-organization.git
   cd company-organization
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_TOKEN=your_airtable_api_token
   VITE_BASE_ID=your_airtable_base_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_TOKEN` | Your Airtable API token/key obtained from your Airtable account |
| `VITE_BASE_ID` | The ID of your Airtable base (found in the API documentation of your base) |

## Usage

1. After starting the application, it will automatically connect to your Airtable base using the provided credentials
2. Use the search bar to find specific data across all fields
3. Click on column headers or use the filter buttons to sort and filter data
4. Adjust table views as needed using the provided controls

## Project Structure

```
airtable-react-data-viewer/
├── public/
├── src/
│   ├── components/
│   │   └── ...
│   ├── App.jsx
│   └── main.jsx
│   └── ...
├── .env
├── package.json
├── vite.config.js
└── tailwind.config.js
```


## Acknowledgements

- [Airtable](https://airtable.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)