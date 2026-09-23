import React from 'react';
import type { TutorApplication, Address } from '../../types';
import { MapPin, CheckSquare, Square } from 'lucide-react';

interface Step2Props {
  data: Partial<TutorApplication>;
  onChange: (fields: Partial<TutorApplication>) => void;
  errors: Record<string, string>;
}

const defaultAddress: Address = {
  houseNo: '',
  street: '',
  city: '',
  district: '',
  state: '',
  pincode: '',
};

export const Step2Address: React.FC<Step2Props> = ({ data, onChange, errors }) => {
  const currentAddress = data.currentAddress || { ...defaultAddress };
  const permanentAddress = data.permanentAddress || { ...defaultAddress };
  const sameAsCurrent = data.sameAsCurrent ?? false;

  const handleCurrentChange = (field: keyof Address, val: string) => {
    const updatedCurrent = { ...currentAddress, [field]: val };
    const updatePayload: Partial<TutorApplication> = { currentAddress: updatedCurrent };

    if (sameAsCurrent) {
      updatePayload.permanentAddress = { ...updatedCurrent };
    }

    onChange(updatePayload);
  };

  const handlePermanentChange = (field: keyof Address, val: string) => {
    if (sameAsCurrent) return;
    const updatedPerm = { ...permanentAddress, [field]: val };
    onChange({ permanentAddress: updatedPerm });
  };

  const handleCheckboxToggle = () => {
    const nextSame = !sameAsCurrent;
    if (nextSame) {
      onChange({
        sameAsCurrent: true,
        permanentAddress: { ...currentAddress },
      });
    } else {
      onChange({
        sameAsCurrent: false,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Step 2: Address Details</h3>
        <p className="text-sm text-slate-500 mt-1">
          Provide your current residence address and permanent hometown address.
        </p>
      </div>

      <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-blue-700 font-bold">
          <MapPin className="w-5 h-5" />
          <h4 className="text-base">Current Address</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              House / Flat Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Flat 302, Royal Residency"
              value={currentAddress.houseNo}
              onChange={(e) => handleCurrentChange('houseNo', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors['currentAddress.houseNo'] ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors['currentAddress.houseNo'] && <p className="text-xs text-rose-500 mt-1">{errors['currentAddress.houseNo']}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Street / Area / Locality <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Green Park Extension"
              value={currentAddress.street}
              onChange={(e) => handleCurrentChange('street', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors['currentAddress.street'] ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors['currentAddress.street'] && <p className="text-xs text-rose-500 mt-1">{errors['currentAddress.street']}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Village / Town / City <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. New Delhi"
              value={currentAddress.city}
              onChange={(e) => handleCurrentChange('city', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors['currentAddress.city'] ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors['currentAddress.city'] && <p className="text-xs text-rose-500 mt-1">{errors['currentAddress.city']}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              District <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. South Delhi"
              value={currentAddress.district}
              onChange={(e) => handleCurrentChange('district', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors['currentAddress.district'] ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors['currentAddress.district'] && <p className="text-xs text-rose-500 mt-1">{errors['currentAddress.district']}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              State <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Delhi / Uttar Pradesh / Maharashtra"
              value={currentAddress.state}
              onChange={(e) => handleCurrentChange('state', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors['currentAddress.state'] ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors['currentAddress.state'] && <p className="text-xs text-rose-500 mt-1">{errors['currentAddress.state']}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              PIN Code <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="e.g. 110016"
              value={currentAddress.pincode}
              onChange={(e) => handleCurrentChange('pincode', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors['currentAddress.pincode'] ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors['currentAddress.pincode'] && <p className="text-xs text-rose-500 mt-1">{errors['currentAddress.pincode']}</p>}
          </div>
        </div>
      </div>

      <div 
        onClick={handleCheckboxToggle}
        className="flex items-center space-x-3 p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors"
      >
        {sameAsCurrent ? (
          <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" />
        ) : (
          <Square className="w-5 h-5 text-slate-400 shrink-0" />
        )}
        <span className="text-sm font-semibold text-blue-950">
          Permanent address is same as current address
        </span>
      </div>

      <div className={`rounded-2xl p-5 border space-y-4 transition-all ${
        sameAsCurrent ? 'bg-slate-100/60 border-slate-200 opacity-80' : 'bg-slate-50/70 border-slate-200'
      }`}>
        <div className="flex items-center space-x-2 text-slate-800 font-bold">
          <MapPin className="w-5 h-5 text-indigo-600" />
          <h4 className="text-base">Permanent Address</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              House / Flat Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              disabled={sameAsCurrent}
              placeholder="e.g. House No 12"
              value={permanentAddress.houseNo}
              onChange={(e) => handlePermanentChange('houseNo', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Street / Area / Locality <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              disabled={sameAsCurrent}
              placeholder="e.g. Main Market Road"
              value={permanentAddress.street}
              onChange={(e) => handlePermanentChange('street', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Village / Town / City <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              disabled={sameAsCurrent}
              placeholder="e.g. Varanasi"
              value={permanentAddress.city}
              onChange={(e) => handlePermanentChange('city', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              District <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              disabled={sameAsCurrent}
              placeholder="e.g. Varanasi"
              value={permanentAddress.district}
              onChange={(e) => handlePermanentChange('district', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              State <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              disabled={sameAsCurrent}
              placeholder="e.g. Uttar Pradesh"
              value={permanentAddress.state}
              onChange={(e) => handlePermanentChange('state', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              PIN Code <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              disabled={sameAsCurrent}
              placeholder="e.g. 221001"
              value={permanentAddress.pincode}
              onChange={(e) => handlePermanentChange('pincode', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 text-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
