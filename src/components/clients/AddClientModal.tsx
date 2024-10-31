import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useClientStore } from '../../store/clientStore';
import { Client } from '../../types/client';
import { Plus, X } from 'lucide-react';

interface AddClientModalProps {
  onClose: () => void;
}

export function AddClientModal({ onClose }: AddClientModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const addClient = useClientStore((state) => state.addClient);

  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    industry: '',
    size: '',
    website: '',
    description: '',

    // Location
    location: {
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      timezone: 'UTC',
    },

    // Contacts
    contacts: [{
      name: '',
      email: '',
      phone: '',
      role: '',
      slackHandle: '',
      meetingFrequency: 'monthly',
    }],

    // Services
    services: [{
      name: '',
      value: 0,
      currency: 'USD',
      features: [''],
    }],
  });

  const addContact = () => {
    setFormData({
      ...formData,
      contacts: [
        ...formData.contacts,
        {
          name: '',
          email: '',
          phone: '',
          role: '',
          slackHandle: '',
          meetingFrequency: 'monthly',
        }
      ]
    });
  };

  const removeContact = (index: number) => {
    setFormData({
      ...formData,
      contacts: formData.contacts.filter((_, i) => i !== index)
    });
  };

  const updateContact = (index: number, field: string, value: string) => {
    setFormData({
      ...formData,
      contacts: formData.contacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newClient: Client = {
      id: String(Date.now()),
      name: formData.name,
      industry: formData.industry,
      size: formData.size,
      location: formData.location,
      status: 'active',
      tags: [],
      contacts: formData.contacts.map((contact, index) => ({
        id: `contact-${index + 1}`,
        ...contact,
        preferences: {
          communicationChannel: 'email',
          meetingFrequency: contact.meetingFrequency,
          notifications: true,
        },
      })),
      servicePackages: formData.services.map((service, index) => ({
        id: `service-${index + 1}`,
        name: service.name,
        features: service.features,
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        status: 'active',
        value: service.value,
        currency: service.currency,
      })),
      customFields: {},
      activities: [],
      metrics: {
        engagementScore: 0,
        responseRate: 0,
        projectSuccessRate: 0,
        retentionProbability: 0,
        riskLevel: 'low',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addClient(newClient);
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Size</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                required
              >
                <option value="">Select Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Location</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={formData.location.address}
                onChange={(e) => setFormData({
                  ...formData,
                  location: { ...formData.location, address: e.target.value }
                })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value }
                  })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State/Province</label>
                <input
                  type="text"
                  value={formData.location.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, state: e.target.value }
                  })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  type="text"
                  value={formData.location.postalCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, postalCode: e.target.value }
                  })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  value={formData.location.country}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, country: e.target.value }
                  })}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Contacts</h3>
              <Button type="button" onClick={addContact} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </div>

            {formData.contacts.map((contact, index) => (
              <div key={index} className="rounded-lg border border-gray-200 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">Contact {index + 1}</h4>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeContact(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => updateContact(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      value={contact.role}
                      onChange={(e) => updateContact(index, 'role', e.target.value)}
                      required
                      placeholder="e.g., Marketing Director"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => updateContact(index, 'email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => updateContact(index, 'phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Slack Handle</label>
                    <input
                      type="text"
                      value={contact.slackHandle}
                      onChange={(e) => updateContact(index, 'slackHandle', e.target.value)}
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meeting Frequency</label>
                    <select
                      value={contact.meetingFrequency}
                      onChange={(e) => updateContact(index, 'meetingFrequency', e.target.value)}
                      required
                    >
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Services</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Name</label>
              <input
                type="text"
                value={formData.services[0].name}
                onChange={(e) => setFormData({
                  ...formData,
                  services: [{ ...formData.services[0], name: e.target.value }]
                })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Value</label>
                <div className="flex">
                  <input
                    type="number"
                    value={formData.services[0].value}
                    onChange={(e) => setFormData({
                      ...formData,
                      services: [{ ...formData.services[0], value: Number(e.target.value) }]
                    })}
                    min="0"
                    required
                    className="rounded-r-none"
                  />
                  <select
                    value={formData.services[0].currency}
                    onChange={(e) => setFormData({
                      ...formData,
                      services: [{ ...formData.services[0], currency: e.target.value }]
                    })}
                    className="rounded-l-none border-l-0"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                    <option value="AUD">AUD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
              {renderStep()}
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit">Create Client</Button>
              )}
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="mr-3"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}