import React from 'react';
import { Button } from '../ui/Button';
import { 
  FileText, FolderPlus, Search, Filter,
  Download, Share2, Trash2, Clock, Tag
} from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { FileUploadModal } from './FileUploadModal';
import { ShareModal } from './ShareModal';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: Date;
  tags: string[];
  shared: boolean;
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Marketing Strategy 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: new Date('2024-03-01'),
    tags: ['Strategy', 'Marketing'],
    shared: true,
  },
  {
    id: '2',
    name: 'Client Presentation.pptx',
    type: 'PowerPoint',
    size: '5.1 MB',
    lastModified: new Date('2024-02-28'),
    tags: ['Presentation', 'Client'],
    shared: false,
  },
];

export function DocumentCenter() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [showUpload, setShowUpload] = React.useState(false);
  const [showShare, setShowShare] = React.useState<{ id: string; name: string } | null>(null);

  const allTags = Array.from(
    new Set(documents.flatMap((doc) => doc.tags))
  );

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => doc.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleUpload = (files: File[], metadata: { tags: string[] }) => {
    // Handle file upload
    console.log('Uploading files:', files, metadata);
  };

  const handleShare = (data: {
    type: 'link' | 'email';
    recipients?: string[];
    permissions: 'view' | 'edit';
    expiresIn?: string;
  }) => {
    // Handle document sharing
    console.log('Sharing document:', showShare?.id, data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Document Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and organize your documents and files
          </p>
        </div>
        <Button onClick={() => setShowUpload(true)}>
          <FolderPlus className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-gray-300 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                )
              }
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
                selectedTags.includes(tag)
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Last Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Tags
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <FileText className="mr-3 h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {doc.name}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {doc.type}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {doc.size}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatDate(doc.lastModified)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex space-x-2">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setShowShare({ id: doc.id, name: doc.name })}
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUpload && (
        <FileUploadModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}

      {showShare && (
        <ShareModal
          documentName={showShare.name}
          onClose={() => setShowShare(null)}
          onShare={handleShare}
        />
      )}
    </div>
  );
}