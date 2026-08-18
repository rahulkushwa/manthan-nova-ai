import { GraduationCap } from "lucide-react";

function ClassSelector({
  selectedClass,
  onSelectClass,
}) {
  const classes = [4,5,6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10">
            <GraduationCap className="h-7 w-7 text-amber-400" />
          </div>

          <h1 className="text-3xl font-bold">
            Welcome to{" "}
            <span className="text-amber-400">
              Manthan Nova AI
            </span>
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Before we begin, select your class so I can
            explain things at the right level.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {classes.map((classLevel) => (
            <button
              key={classLevel}
              onClick={() => onSelectClass(classLevel)}
              className={`
                rounded-2xl border px-4 py-5
                text-lg font-semibold transition
                ${
                  selectedClass === classLevel
                    ? "border-amber-400 bg-amber-400 text-black"
                    : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-amber-400/40 hover:bg-amber-400/10"
                }
              `}
            >
              Class {classLevel}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClassSelector;