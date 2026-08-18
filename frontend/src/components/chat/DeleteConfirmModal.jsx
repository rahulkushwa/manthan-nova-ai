import { AlertTriangle, Trash2, X } from "lucide-react";


function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}) {
  if (!isOpen) {
    return null;
  }


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => {
          if (!isDeleting) {
            onClose();
          }
        }}
      />


      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute right-4 top-4 rounded-lg p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>


        <div className="p-6 sm:p-7">

          {/* Warning Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
            <AlertTriangle className="h-7 w-7 text-red-400" />
          </div>


          {/* Content */}
          <h2 className="text-xl font-bold text-white">
            Delete conversation?
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            This conversation and all its messages will be
            permanently deleted. This action cannot be undone.
          </p>


          {/* Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              onClick={onClose}
              disabled={isDeleting}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>


            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />

              {isDeleting
                ? "Deleting..."
                : "Delete"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


export default DeleteConfirmModal;