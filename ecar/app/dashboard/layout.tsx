import DashboardHeader from "./components/DashboardHeader";

function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

    return ( 
    <main className="mx-auto max-w-screen-2xl p-8">
        <div className="mx-auto max-w-2/3">
            <div className="mx-auto max-w-2/3">
                <DashboardHeader />
                {children}
            </div>
        </div>
    </main>
     );
}

export default DashboardLayout;