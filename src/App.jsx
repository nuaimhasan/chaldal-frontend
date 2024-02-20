import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./hooks/useAuthCheck";
import Spinner from "./components/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { useGetFaviconQuery } from "./Redux/favicon/faviconApi";
import { useGetBusinessInfoQuery } from "./Redux/businessInfoApi/businessInfoApi";
import { useGetThemesQuery } from "./Redux/theme/themeApi";

export default function App() {
  const authChecked = useAuthCheck();

  const { data: favicon, isLoading } = useGetFaviconQuery();
  const icon = favicon?.data[0]?.icon;

  const { data: business, isLoading: businessIsLoading } =
    useGetBusinessInfoQuery();
  const businessInfo = business?.data[0];

  const { data: color } = useGetThemesQuery();
  const colors = color?.data[0];

  useEffect(() => {
    if (colors) {
      document.documentElement.style.setProperty("--primary", colors?.primary);
      document.documentElement.style.setProperty(
        "--secondary",
        colors?.secondary
      );
      document.documentElement.style.setProperty("--accent", colors?.accent);
    }
  }, [colors]);

  if (!authChecked || isLoading || businessIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{businessInfo?.title}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${import.meta.env.VITE_BACKEND_URL}/favicon/${icon}`}
        />
        <link rel="canonical" href={import.meta.env.VITE_FRONTEND_URL} />
        <meta name="description" content={businessInfo?.metaContent} />
      </Helmet>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}
