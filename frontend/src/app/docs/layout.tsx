import { Footer, Layout} from "nextra-theme-docs";
import { Banner, Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import Navbar from "../component/navbar/navbar";

export const metadata = {
  title: "My Cool Docs Site",
};


const navbar = (
  <Navbar/>
);

const footer = (
  <Footer>MIT {new Date().getFullYear()} © My Cool Project.</Footer>
);

const search = <Search placeholder="Search docs.." />;
const pageMap = await getPageMap();

const docsChildren =
  pageMap
    .filter((item): item is Extract<typeof item, { children: any }> => 'children' in item)
    .find(item => item.route === '/docs')
    ?.children ?? [];
export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout
      navbar={navbar}
      pageMap={docsChildren}
      docsRepositoryBase="https://github.com/bhavya-dang/my-project"
      footer={footer}
      search={search}
      editLink={null}
      feedback={{ content: null }}
    >
      {children}
    </Layout>
  );
}