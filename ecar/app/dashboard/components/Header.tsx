var session = require('../modules/session')

export function Header() {
    return ( 
        <div className="mb-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-orange-600 underline">
            {session.placeholderName} Settings
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                  <p className="font-semibold text-orange-600">
                      Dashboard
                  </p>
              </li>
              <li>
                  <p className="-indent-1 font-semibold">
                      /
                  </p>
              </li>
              <li>
                  <p className="-indent-1 font-semibold text-slate-700">
                      Settings
                  </p>
              </li>
            </ol>
          </nav>
        </div>
     );
}