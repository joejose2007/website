import React, { useState } from 'react';
import { Shield, FileText, AlertTriangle, CheckCircle2, Lock, Eye, RefreshCw, FileSearch } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface SampleFile {
  name: string;
  type: string;
  size: string;
  risk: 'High' | 'Medium' | 'Low';
  metadata: {
    key: string;
    value: string;
    riskReason?: string;
  }[];
}

const SAMPLE_FILES: SampleFile[] = [
  {
    name: 'investigation_photo_04.jpg',
    type: 'image/jpeg',
    size: '3.4 MB',
    risk: 'High',
    metadata: [
      { key: 'Camera Model', value: 'Sony Alpha 7 IV (Firmware 2.01)' },
      { key: 'Camera Serial No', value: 'S/N: 4892019-US', riskReason: 'Hardware identifier can link device to owner' },
      { key: 'GPS Latitude', value: '37° 46\' 29.8" N', riskReason: 'Exact physical location disclosed' },
      { key: 'GPS Longitude', value: '122° 25\' 09.5" W', riskReason: 'Exact physical location disclosed' },
      { key: 'Original Timestamp', value: '2026-08-14 17:42:09 UTC' },
      { key: 'Author / Owner', value: 'Joe Jose Workstation (UID: 1000)', riskReason: 'Reveals internal username' },
      { key: 'Software', value: 'Adobe Lightroom Classic 13.2' },
    ],
  },
  {
    name: 'audit_report_draft.pdf',
    type: 'application/pdf',
    size: '840 KB',
    risk: 'Medium',
    metadata: [
      { key: 'Producer', value: 'macOS Version 15.2 Quartz PDFContext' },
      { key: 'Creator', value: 'Microsoft Word for Mac 16.88' },
      { key: 'Document Title', value: 'Internal Security Assessment - Q2 Review' },
      { key: 'Author', value: 'alex_analyst_corp', riskReason: 'Reveals corporate directory username' },
      { key: 'Modified Date', value: '2026-08-18 09:15:30' },
      { key: 'Hidden Revisions', value: '3 prior revisions found in trailer dictionary', riskReason: 'May contain previously deleted text' },
    ],
  },
  {
    name: 'traffic_capture_sample.pcap',
    type: 'application/vnd.tcpdump.pcap',
    size: '1.2 MB',
    risk: 'High',
    metadata: [
      { key: 'Capture Interface', value: 'eth0 (1000Mbps Full Duplex)' },
      { key: 'Originating Host IP', value: '192.168.1.104', riskReason: 'Internal subnet topology exposed' },
      { key: 'Gateway MAC', value: 'd8:07:b6:4a:12:9e', riskReason: 'Hardware vendor fingerprintable' },
      { key: 'DNS Queries Logged', value: 'internal-portal.corp.local', riskReason: 'Internal DNS namespace exposed' },
      { key: 'Packet Count', value: '4,812 frames' },
    ],
  },
];

export const MetadataGuardDemo: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<SampleFile>(SAMPLE_FILES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isStripped, setIsStripped] = useState(false);

  const handleSelectFile = (file: SampleFile) => {
    sounds.playPaperClick();
    setIsAnalyzing(true);
    setIsStripped(false);
    setTimeout(() => {
      setSelectedFile(file);
      setIsAnalyzing(false);
      sounds.playPaperRustle();
    }, 350);
  };

  const handleStripMetadata = () => {
    sounds.playPencilScribble();
    setIsStripped(true);
  };

  return (
    <div className="bg-[#fcfbf9] sketch-border p-5 my-4 bg-kraft-grid relative">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#28241f] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#e8e2d4] sketch-border-sm flex items-center justify-center">
            <Shield className="w-4 h-4 text-[#28241f]" />
          </div>
          <div>
            <h4 className="font-sketch text-xl font-bold tracking-wide">MetadataGuard Interactive Inspector</h4>
            <p className="text-xs font-hand text-stone-600 text-base -mt-1">Live demonstration of file metadata analysis & forensic extraction</p>
          </div>
        </div>

        <span className="text-xs font-code px-2.5 py-1 bg-[#28241f] text-[#f7f5f0] sketch-border-sm">
          PYTHON FORENSIC ENGINE
        </span>
      </div>

      {/* File selector tabs */}
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase tracking-wider mb-2 font-code text-stone-700">
          Select Sample Artifact to Inspect:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_FILES.map((file) => {
            const isCurrent = file.name === selectedFile.name;
            return (
              <button
                key={file.name}
                type="button"
                onClick={() => handleSelectFile(file)}
                className={`p-2.5 text-left sketch-border-sm transition-all text-xs font-code flex items-start gap-2 ${
                  isCurrent ? 'bg-[#ebd7b0] shadow-inner font-bold' : 'bg-[#f4efe4] hover:bg-[#eae2cf]'
                }`}
              >
                <FileText className="w-4 h-4 mt-0.5 shrink-0 text-stone-700" />
                <div className="truncate">
                  <div className="truncate font-semibold">{file.name}</div>
                  <div className="text-[10px] text-stone-600">{file.size} · {file.risk} Risk</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Analysis Output Panel */}
      {isAnalyzing ? (
        <div className="py-12 text-center">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-stone-700 mb-2" />
          <p className="font-hand text-lg text-stone-700">Extracting EXIF & header structures via Python engine...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Header summary banner */}
          <div className="flex flex-wrap items-center justify-between p-3 bg-[#f2ecdd] sketch-border-sm gap-2">
            <div>
              <span className="text-xs font-code text-stone-600">Target: </span>
              <span className="font-bold text-sm font-code">{selectedFile.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-code text-stone-600">Privacy Status:</span>
              {isStripped ? (
                <span className="inline-flex items-center gap-1 text-xs font-code font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 sketch-border-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" /> CLEAN / SANITIZED
                </span>
              ) : (
                <span className={`inline-flex items-center gap-1 text-xs font-code font-bold px-2 py-0.5 sketch-border-sm ${
                  selectedFile.risk === 'High' ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-900'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5" /> {selectedFile.risk.toUpperCase()} PRIVACY RISK
                </span>
              )}
            </div>
          </div>

          {/* Metadata Table */}
          <div className="overflow-x-auto sketch-border-sm bg-white">
            <table className="w-full text-xs font-code text-left border-collapse">
              <thead>
                <tr className="bg-[#e8e2d4] border-b border-[#28241f]">
                  <th className="p-2 font-bold">Metadata Field</th>
                  <th className="p-2 font-bold">Extracted Value</th>
                  <th className="p-2 font-bold">Security / Forensics Implication</th>
                </tr>
              </thead>
              <tbody>
                {isStripped ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-stone-600 italic">
                      All identifying EXIF tags, GPS coordinates, serials, and author handles successfully scrubbed.
                    </td>
                  </tr>
                ) : (
                  selectedFile.metadata.map((item, idx) => (
                    <tr key={idx} className="border-b border-stone-200 hover:bg-amber-50/40">
                      <td className="p-2 font-semibold text-stone-800">{item.key}</td>
                      <td className="p-2 font-mono text-stone-900 break-all">{item.value}</td>
                      <td className="p-2">
                        {item.riskReason ? (
                          <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-1.5 py-0.5 rounded text-[11px]">
                            <Eye className="w-3 h-3 shrink-0" /> {item.riskReason}
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[11px]">Standard header parameter</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-xs font-hand text-stone-600 text-base">
              💡 <em>Metadata analysis demonstrates how easily digital footprints can leak confidential details without proper sanitization.</em>
            </p>

            <div className="flex items-center gap-2">
              {!isStripped ? (
                <button
                  type="button"
                  onClick={handleStripMetadata}
                  className="sketch-button px-3 py-1.5 bg-[#ebd7b0] hover:bg-[#e0caa0] text-xs font-code font-bold flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" /> Sanitize / Scrub Metadata
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsStripped(false)}
                  className="sketch-button px-3 py-1.5 bg-[#f4efe4] hover:bg-[#eae2cf] text-xs font-code font-bold flex items-center gap-1.5"
                >
                  <FileSearch className="w-3.5 h-3.5" /> Re-inspect Raw Headers
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
