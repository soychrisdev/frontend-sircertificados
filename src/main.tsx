import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import "./main.css";
import PageError from "./pages/Error";
import Home from "./pages/Home";
import HomePDFView from "./pages/HomePDFView";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: (failureCount) => (failureCount > 3 ? true : false),
			// staleTime: 1000 * 60 * 60 * 6, // 6 hours
			// cacheTime: 1000 * 60 * 60 * 3, // 3 hours
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <PageError />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/GESTION/:i_rut/:i_tpart/:i_seun_ccod",
				element: <HomePDFView />,
			},
			{
				path: "*",
				element: <Home />,
			},
		],
	},
]);

// rome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>,
);
