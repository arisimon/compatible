import React from 'react';
import { Button } from '../ui/Button';
import { useSalesStore } from '../../store/salesStore';
import { Plus, Trash2 } from 'lucide-react';

interface ProposalFormProps {
  dealId: string;
  onClose: () => void;
}

export function ProposalForm({ dealId, onClose }: ProposalFormProps) {
  const [formData, setFormData] = React.useState({
    products: [{ name: '', quantity: 1, unitPrice: 0, discount: 0 }],
    services: [{ name: '', hours: 0, ratePerHour: 0, discount: 0 }],
    terms: '',
    validUntil: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalValue =
      formData.products.reduce(
        (sum, p) => sum + p.quantity * p.unitPrice * (1 - (p.discount || 0) / 100),
        0
      ) +
      formData.services.reduce(
        (sum, s) => sum + s.hours * s.ratePerHour * (1 - (s.discount || 0) / 100),
        0
      );

    useSalesStore.getState().addProposal({
      id: String(Date.now()),
      dealId,
      version: 1,
      status: 'draft',
      content: {
        ...formData,
        validUntil: new Date(formData.validUntil),
      },
      totalValue,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Create Proposal
                </h3>
                <div className="mt-4 space-y-6">
                  {/* Products Section */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Products</h4>
                    {formData.products.map((product, index) => (
                      <div key={index} className="mt-2 space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Product Name
                            </label>
                            <input
                              type="text"
                              value={product.name}
                              onChange={(e) => {
                                const newProducts = [...formData.products];
                                newProducts[index].name = e.target.value;
                                setFormData({ ...formData, products: newProducts });
                              }}
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Quantity
                            </label>
                            <input
                              type="number"
                              value={product.quantity}
                              onChange={(e) => {
                                const newProducts = [...formData.products];
                                newProducts[index].quantity = Number(e.target.value);
                                setFormData({ ...formData, products: newProducts });
                              }}
                              min="1"
                              className="mt-1"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Unit Price
                            </label>
                            <input
                              type="number"
                              value={product.unitPrice}
                              onChange={(e) => {
                                const newProducts = [...formData.products];
                                newProducts[index].unitPrice = Number(e.target.value);
                                setFormData({ ...formData, products: newProducts });
                              }}
                              min="0"
                              step="0.01"
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Discount %
                            </label>
                            <input
                              type="number"
                              value={product.discount}
                              onChange={(e) => {
                                const newProducts = [...formData.products];
                                newProducts[index].discount = Number(e.target.value);
                                setFormData({ ...formData, products: newProducts });
                              }}
                              min="0"
                              max="100"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              const newProducts = formData.products.filter(
                                (_, i) => i !== index
                              );
                              setFormData({ ...formData, products: newProducts });
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Product
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          products: [
                            ...formData.products,
                            { name: '', quantity: 1, unitPrice: 0, discount: 0 },
                          ],
                        })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </div>

                  {/* Services Section */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Services</h4>
                    {formData.services.map((service, index) => (
                      <div key={index} className="mt-2 space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Service Name
                            </label>
                            <input
                              type="text"
                              value={service.name}
                              onChange={(e) => {
                                const newServices = [...formData.services];
                                newServices[index].name = e.target.value;
                                setFormData({ ...formData, services: newServices });
                              }}
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Hours
                            </label>
                            <input
                              type="number"
                              value={service.hours}
                              onChange={(e) => {
                                const newServices = [...formData.services];
                                newServices[index].hours = Number(e.target.value);
                                setFormData({ ...formData, services: newServices });
                              }}
                              min="0"
                              className="mt-1"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Rate per Hour
                            </label>
                            <input
                              type="number"
                              value={service.ratePerHour}
                              onChange={(e) => {
                                const newServices = [...formData.services];
                                newServices[index].ratePerHour = Number(e.target.value);
                                setFormData({ ...formData, services: newServices });
                              }}
                              min="0"
                              step="0.01"
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Discount %
                            </label>
                            <input
                              type="number"
                              value={service.discount}
                              onChange={(e) => {
                                const newServices = [...formData.services];
                                newServices[index].discount = Number(e.target.value);
                                setFormData({ ...formData, services: newServices });
                              }}
                              min="0"
                              max="100"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              const newServices = formData.services.filter(
                                (_, i) => i !== index
                              );
                              setFormData({ ...formData, services: newServices });
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Service
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          services: [
                            ...formData.services,
                            { name: '', hours: 0, ratePerHour: 0, discount: 0 },
                          ],
                        })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Service
                    </Button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Terms and Conditions
                    </label>
                    <textarea
                      value={formData.terms}
                      onChange={(e) =>
                        setFormData({ ...formData, terms: e.target.value })
                      }
                      rows={4}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Valid Until
                    </label>
                    <input
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) =>
                        setFormData({ ...formData, validUntil: e.target.value })
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" className="sm:ml-3">
                Create Proposal
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}