import React from 'react';
import { useClientStore } from '../../store/clientStore';
import { FileText, Download } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface ClientDocumentsProps {
  clientId: string;
}

export function ClientDocuments({ clientId }: ClientDocumentsProps) {
  const documents = useClientStore((state) =>
    state.documents.filter((d) => d.clientId === clientId)
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-medium text-gray-900">Documents</h2>

      <div className="mt-6 space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(doc.metadata.lastModified)}
                </p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <Download className="h-5 w-5" />
            </button>
          </div>
        ))}

        {documents.length === 0 && (
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload documents to share with this client.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}