import { Header } from "./components/Header";
import { File } from "./components/File";
import { Form } from "./components/Form";

function Dashboard() {
  return (
    <section id='dashboard'>
        <div className="mx-auto max-w-screen-2xl p-4">
            < Header />
            < File />
            < Form />
        </div>
    </section>
  );
}

export default Dashboard;