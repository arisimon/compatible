import React, { useState } from 'react';
import { OnboardingProgress } from '../components/onboarding/OnboardingProgress';
import { Button } from '../components/ui/Button';

const steps = [
  { id: 1, name: 'Business Profile', status: 'current' },
  { id: 2, name: 'Marketing Goals', status: 'upcoming' },
  { id: 3, name: 'Asset Upload', status: 'upcoming' },
  { id: 4, name: 'Campaign Brief', status: 'upcoming' },
] as const;

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to Your Marketing Journey
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Let's get your account set up and start achieving your marketing goals.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="px-4 sm:px-6 lg:px-8">
            <OnboardingProgress steps={steps} />
          </div>

          {/* Form container */}
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Business Profile</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Tell us about your business so we can better understand your needs.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="company-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Industry
                    </label>
                    <select
                      id="industry"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option>Select an industry</option>
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Retail</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Business Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end space-x-4">
              <Button variant="outline">Save Draft</Button>
              <Button onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}