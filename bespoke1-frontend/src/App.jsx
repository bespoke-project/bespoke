import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  return <>

  {/* TODO: Test-Div löschen, wenn fertig getestet. */}
  <div title="Dies kann alles weg. Hier erst nur Test (mit class)" className="text-center">
  <p className="italic">Test: Hallo Welt. Diese Zeile kann dann weg.</p>
  <p>Tailwind-Klassen funktionieren</p>
  <p>DaiyUI-Elemente funktionieren.</p>
  <button
  className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
  Button
</button>
</div>

  </>;
}

export default App;
