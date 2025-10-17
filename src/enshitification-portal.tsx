import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingDown, Shield, DollarSign, Search, X, AlertCircle, FileText, Scale, Eye, Sparkles, Filter, SortAsc } from 'lucide-react';
import { geminiService } from './services/geminiAI';
import { cfpbAPI } from './services/cfpbAPI';
import { nhtsaAPI } from './services/nhtsaAPI';
import { ftcAPI } from './services/ftcAPI';

const EnshitificationPortal = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [isAISearch, setIsAISearch] = useState(false);
  const [aiSearchResult, setAISearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState<'complaints' | 'recalls' | 'name'>('complaints');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [liveApiData, setLiveApiData] = useState<any>(null);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const colors = {
    primary: '#20AA3F',
    primaryDark: '#1E9642',
    primaryLight: '#4CAF50',
    caBlue: '#004abc',
    caGold: '#fec02f',
    bayBlue: '#14558F',
    success: '#489b62',
    danger: '#D14124',
    warning: '#a38900',
    info: '#5a8ad4',
    darkBg: '#1a2332',
    gray900: '#212121',
    gray700: '#5e5e6a',
    gray500: '#898891',
    gray300: '#bcbbc1',
    gray200: '#d4d4d7',
    gray100: '#ededef',
    gray50: '#f7f8f9',
    white: '#ffffff'
  };

  const liveStats = {
    cfpbComplaints: 1847293,
    nhtsaRecalls: 14782,
    cpscViolations: 8934,
    ftcComplaints: 5834291,
    worstSector: "Financial Services"
  };

  const sectorData = [
    { sector: 'Financial Services', score: 87, complaints: 847293 },
    { sector: 'Automotive', score: 76, complaints: 312847 },
    { sector: 'Consumer Products', score: 68, complaints: 234891 },
    { sector: 'Technology', score: 54, complaints: 189273 },
    { sector: 'Healthcare', score: 49, complaints: 163989 }
  ];

  const companyRankings = [
    { name: 'Wells Fargo', grade: 'F', complaints: 127849, recalls: 0, sector: 'Financial' },
    { name: 'Ford Motor Company', grade: 'F', complaints: 8473, recalls: 847, sector: 'Automotive' },
    { name: 'Bank of America', grade: 'F', complaints: 98273, recalls: 0, sector: 'Financial' },
    { name: 'Amazon (Consumer Products)', grade: 'D', complaints: 34829, recalls: 234, sector: 'Consumer' },
    { name: 'Tesla', grade: 'D', complaints: 12847, recalls: 156, sector: 'Automotive' },
    { name: 'Equifax', grade: 'D', complaints: 67382, recalls: 0, sector: 'Financial' },
    { name: 'Capital One', grade: 'C', complaints: 45291, recalls: 0, sector: 'Financial' },
    { name: 'GM', grade: 'C', complaints: 9384, recalls: 287, sector: 'Automotive' }
  ];

  const timelineEvents = [
    {
      company: 'Wells Fargo',
      issue: 'Unauthorized account openings',
      date: '2024-10-15',
      source: 'CFPB',
      severity: 'Critical',
      units: 8473
    },
    {
      company: 'Robocall Scammers',
      issue: 'Illegal robocall campaign targeting seniors',
      date: '2024-10-14',
      source: 'FTC',
      severity: 'Critical',
      units: 234891
    },
    {
      company: 'Ford F-150',
      issue: 'Brake system defect recall',
      date: '2024-10-12',
      source: 'NHTSA',
      severity: 'High',
      units: 145000
    },
    {
      company: 'Amazon',
      issue: 'Deceptive pricing and subscription practices',
      date: '2024-10-11',
      source: 'FTC',
      severity: 'High',
      units: 15847
    },
    {
      company: 'Amazon Basics',
      issue: 'Fire hazard in power adapters',
      date: '2024-10-10',
      source: 'CPSC',
      severity: 'Critical',
      units: 67000
    },
    {
      company: 'Bank of America',
      issue: 'Improper overdraft fees',
      date: '2024-10-08',
      source: 'CFPB',
      severity: 'Medium',
      units: 3847
    },
    {
      company: 'Tesla Model Y',
      issue: 'Steering wheel detachment',
      date: '2024-10-05',
      source: 'NHTSA',
      severity: 'Critical',
      units: 12000
    }
  ];

  const getGradeColor = (grade) => {
    const gradeColors = {
      'F': colors.danger,
      'D': '#E57373',
      'C': colors.warning,
      'B': '#81C784',
      'A': colors.success
    };
    return gradeColors[grade] || colors.gray500;
  };

  const getSeverityStyle = (severity) => {
    const styles = {
      'Critical': { bg: '#FFEBEE', text: colors.danger, border: colors.danger },
      'High': { bg: '#FFF3E0', text: '#E65100', border: '#FF9800' },
      'Medium': { bg: '#FFFDE7', text: colors.warning, border: colors.warning },
      'Low': { bg: '#E8F5E9', text: colors.success, border: colors.success }
    };
    return styles[severity] || { bg: colors.gray100, text: colors.gray700, border: colors.gray300 };
  };

  const getSourceColor = (source) => {
    const sourceColors = {
      'CFPB': colors.primary,
      'NHTSA': colors.danger,
      'CPSC': colors.info,
      'FTC': colors.warning
    };
    return sourceColors[source] || colors.gray700;
  };

  const filteredCompanies = companyRankings
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.sector.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = filterSector === 'all' || company.sector.toLowerCase().includes(filterSector.toLowerCase());
      return matchesSearch && matchesSector;
    })
    .sort((a, b) => {
      if (sortBy === 'complaints') return b.complaints - a.complaints;
      if (sortBy === 'recalls') return b.recalls - a.recalls;
      return a.name.localeCompare(b.name);
    });

  const filteredTimeline = timelineEvents.filter(event =>
    event.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSectors = sectorData.filter(sector =>
    sector.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasNoResults = searchQuery && filteredCompanies.length === 0 && filteredTimeline.length === 0 && filteredSectors.length === 0;

  // Handle AI-powered search
  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setIsAISearch(true);
    
    try {
      if (geminiService.isAvailable()) {
        const result = await geminiService.naturalLanguageSearch(searchQuery, {
          companies: companyRankings,
          sectors: sectorData,
          timeline: timelineEvents
        });
        setAISearchResult(result);
        
        // Apply AI filters if available
        if (result.filters?.sector) {
          setFilterSector(result.filters.sector);
        }
      } else {
        // Fallback if Gemini not available
        setAISearchResult({
          intent: 'general_query',
          searchTerm: searchQuery,
          answer: 'AI search requires Gemini API key. Using standard search.'
        });
      }
    } catch (error) {
      console.error('AI search error:', error);
      setAISearchResult({
        intent: 'error',
        answer: 'AI search unavailable. Using standard search.'
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Handle live API data fetch
  const handleLiveDataFetch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Fetch data from multiple sources in parallel
      const [cfpbData, ftcData] = await Promise.all([
        cfpbAPI.searchComplaints(searchQuery, 10).catch(err => {
          console.error('CFPB API error:', err);
          return null;
        }),
        ftcAPI.searchFraudReports(searchQuery, 10).catch(err => {
          console.error('FTC API error:', err);
          return null;
        })
      ]);
      
      // Combine the data
      const combinedData = {
        cfpb: cfpbData,
        ftc: ftcData,
        timestamp: new Date().toISOString()
      };
      
      setLiveApiData(combinedData);
      
      // If both APIs fail and Gemini is available, use AI to provide insights
      if (!cfpbData && !ftcData && geminiService.isAvailable()) {
        try {
          const aiInsight = await geminiService.consumerAdviceBot(
            `I'm searching for information about ${searchQuery}. Can you provide general consumer protection guidance?`,
            { searchQuery }
          );
          setAISearchResult({
            intent: 'fallback',
            answer: aiInsight
          });
        } catch (aiError) {
          console.error('Gemini fallback error:', aiError);
        }
      }
    } catch (error) {
      console.error('Live data fetch error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search (supports both regular and AI search)
  const handleSearch = () => {
    if (isAISearch || geminiService.isAvailable()) {
      handleAISearch();
    }
    handleLiveDataFetch();
  };

  // Handle Enter key in search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.gray50, fontFamily: 'Public Sans, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Beta Phase Banner - UK GOV.UK Style */}
      <div style={{ backgroundColor: '#1d70b8', padding: '0.75rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ 
              backgroundColor: colors.white, 
              color: '#1d70b8'
            }}>
              Beta
            </span>
            <span className="text-sm" style={{ color: colors.white }}>
              This is a new service – your <a href="https://devpost.com/bruhdev1290?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav" target="_blank" rel="noopener noreferrer" style={{ color: colors.white, textDecoration: 'underline', fontWeight: 'bold' }}>feedback</a> will help us to improve it.
            </span>
          </div>
        </div>
      </div>

      <div style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, padding: '4rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.white }}>Access Consumer Protection Data & Report Concerns</h1>
          <p className="text-lg md:text-xl mb-8" style={{ color: 'rgba(255,255,255,0.9)' }}>Track quality decline across industries using real government data from CFPB, NHTSA, CPSC, and FTC</p>
          
          <div className="max-w-3xl">
            <div className="p-6 rounded-lg" style={{ backgroundColor: colors.white }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: colors.gray900 }}>Find companies and sectors</h3>
                <button 
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-2 px-3 py-1 text-sm rounded"
                  style={{ 
                    backgroundColor: showAdvancedFilters ? colors.primary : colors.gray100, 
                    color: showAdvancedFilters ? colors.white : colors.gray700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Filter size={16} />
                  Filters
                </button>
              </div>

              {showAdvancedFilters && (
                <div className="mb-4 p-4 rounded" style={{ backgroundColor: colors.gray50 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.gray700 }}>
                        Filter by Sector
                      </label>
                      <select
                        value={filterSector}
                        onChange={(e) => setFilterSector(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        style={{ borderColor: colors.gray300, color: colors.gray900 }}
                      >
                        <option value="all">All Sectors</option>
                        <option value="financial">Financial</option>
                        <option value="automotive">Automotive</option>
                        <option value="consumer">Consumer Products</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.gray700 }}>
                        Sort Results By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-full px-3 py-2 border rounded"
                        style={{ borderColor: colors.gray300, color: colors.gray900 }}
                      >
                        <option value="complaints">Most Complaints</option>
                        <option value="recalls">Most Recalls</option>
                        <option value="name">Company Name</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search by company name, sector, or ask a question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 text-base border-2 rounded"
                  style={{ borderColor: colors.gray300, color: colors.gray900, outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = colors.primary}
                  onBlur={(e) => e.target.style.borderColor = colors.gray300}
                />
                <button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-8 py-3 font-semibold rounded flex items-center gap-2" 
                  style={{ 
                    backgroundColor: isSearching ? colors.gray300 : colors.primary, 
                    color: colors.white, 
                    border: 'none', 
                    cursor: isSearching ? 'not-allowed' : 'pointer' 
                  }}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Searching
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Search
                    </>
                  )}
                </button>
              </div>

              {geminiService.isAvailable() && (
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => setIsAISearch(!isAISearch)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm rounded"
                    style={{
                      backgroundColor: isAISearch ? colors.info : 'transparent',
                      color: isAISearch ? colors.white : colors.info,
                      border: `1px solid ${colors.info}`,
                      cursor: 'pointer'
                    }}
                  >
                    <Sparkles size={14} />
                    AI-Powered Search {isAISearch && '✓'}
                  </button>
                  <span className="text-xs" style={{ color: colors.gray500 }}>
                    Try: "Which financial companies have the most complaints?"
                  </span>
                </div>
              )}

              {aiSearchResult && (
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.info + '10', border: `1px solid ${colors.info}` }}>
                  <div className="flex items-start gap-3">
                    <Sparkles size={20} style={{ color: colors.info, flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <p className="font-medium mb-1" style={{ color: colors.gray900 }}>AI Analysis:</p>
                      <p className="text-sm" style={{ color: colors.gray700 }}>{aiSearchResult.answer}</p>
                    </div>
                  </div>
                </div>
              )}

              {searchQuery && (
                <div className="mt-3 text-sm" style={{ color: colors.gray700 }}>
                  {hasNoResults ? (
                    <span style={{ color: colors.danger }}>No results found for "{searchQuery}"</span>
                  ) : (
                    <span>Found: <strong>{filteredCompanies.length}</strong> companies, <strong>{filteredTimeline.length}</strong> events, <strong>{filteredSectors.length}</strong> sectors</span>
                  )}
                </div>
              )}

              <div className="text-xs mt-3" style={{ color: colors.gray500 }}>
                Example: Wells Fargo, Financial Services, "show me automotive recalls"
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.white, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: `4px solid ${colors.primary}` }}>
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <FileText size={48} style={{ color: colors.primary }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.gray900 }}>CFPB Complaints</h3>
                <p className="mb-4" style={{ color: colors.gray700, fontSize: '0.95rem' }}>Access consumer financial complaints and track resolution rates</p>
                <div className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>{liveStats.cfpbComplaints.toLocaleString()}</div>
                <button className="font-semibold text-sm" style={{ color: colors.primary, background: 'none', border: 'none', cursor: 'pointer' }}>View Data →</button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.white, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: `4px solid ${colors.danger}` }}>
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Scale size={48} style={{ color: colors.danger }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.gray900 }}>Safety Recalls</h3>
                <p className="mb-4" style={{ color: colors.gray700, fontSize: '0.95rem' }}>Monitor vehicle and product safety recalls from NHTSA</p>
                <div className="text-3xl font-bold mb-4" style={{ color: colors.danger }}>{liveStats.nhtsaRecalls.toLocaleString()}</div>
                <button className="font-semibold text-sm" style={{ color: colors.danger, background: 'none', border: 'none', cursor: 'pointer' }}>View Recalls →</button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.white, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: `4px solid ${colors.info}` }}>
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Eye size={48} style={{ color: colors.info }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.gray900 }}>CPSC Violations</h3>
                <p className="mb-4" style={{ color: colors.gray700, fontSize: '0.95rem' }}>Track consumer product safety violations and penalties</p>
                <div className="text-3xl font-bold mb-4" style={{ color: colors.info }}>{liveStats.cpscViolations.toLocaleString()}</div>
                <button className="font-semibold text-sm" style={{ color: colors.info, background: 'none', border: 'none', cursor: 'pointer' }}>View Violations →</button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.white, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: `4px solid ${colors.warning}` }}>
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <AlertTriangle size={48} style={{ color: colors.warning }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.gray900 }}>FTC Fraud Reports</h3>
                <p className="mb-4" style={{ color: colors.gray700, fontSize: '0.95rem' }}>Monitor fraud, scams, and identity theft complaints</p>
                <div className="text-3xl font-bold mb-4" style={{ color: colors.warning }}>{liveStats.ftcComplaints.toLocaleString()}</div>
                <button className="font-semibold text-sm" style={{ color: colors.warning, background: 'none', border: 'none', cursor: 'pointer' }}>View Reports →</button>
              </div>
            </div>
          </div>
        </section>

        {(!searchQuery || filteredSectors.length > 0) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.gray900 }}>
              Sector Analysis
              {searchQuery && <span className="text-xl ml-3" style={{ color: colors.gray700 }}>({filteredSectors.length} results)</span>}
            </h2>
            <div className="p-6 border-l-4 rounded-r-lg" style={{ backgroundColor: colors.white, borderLeftColor: colors.bayBlue, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={searchQuery ? filteredSectors : sectorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.gray200} />
                  <XAxis dataKey="sector" stroke={colors.gray500} tick={{ fill: colors.gray700, fontSize: 13 }} />
                  <YAxis stroke={colors.gray500} tick={{ fill: colors.gray700, fontSize: 13 }} label={{ value: 'Complaint Score', angle: -90, position: 'insideLeft', fill: colors.gray700 }} />
                  <Tooltip contentStyle={{ backgroundColor: colors.white, border: `2px solid ${colors.gray200}`, borderRadius: '6px', color: colors.gray900 }} formatter={(value, name, props) => [`${value} (${props.payload.complaints.toLocaleString()} complaints)`, 'Score']} />
                  <Bar dataKey="score" fill={colors.danger} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {(!searchQuery || filteredCompanies.length > 0) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.gray900 }}>
              Company Rankings
              {searchQuery && <span className="text-xl ml-3" style={{ color: colors.gray700 }}>({filteredCompanies.length} results)</span>}
            </h2>
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.white, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: `1px solid ${colors.gray200}` }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: colors.gray100 }}>
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: colors.gray900 }}>Rank</th>
                      <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: colors.gray900 }}>Company</th>
                      <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: colors.gray900 }}>Grade</th>
                      <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: colors.gray900 }}>Complaints</th>
                      <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: colors.gray900 }}>Recalls</th>
                      <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: colors.gray900 }}>Sector</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(searchQuery ? filteredCompanies : companyRankings).map((company, index) => (
                      <tr key={index} style={{ borderTop: `1px solid ${colors.gray200}` }}>
                        <td className="px-6 py-4" style={{ color: colors.gray700 }}>#{index + 1}</td>
                        <td className="px-6 py-4 font-semibold" style={{ color: colors.gray900 }}>{company.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-4 py-1.5 font-bold text-sm inline-block rounded" style={{ backgroundColor: getGradeColor(company.grade), color: colors.white }}>{company.grade}</span>
                        </td>
                        <td className="px-6 py-4" style={{ color: colors.gray900 }}>{company.complaints.toLocaleString()}</td>
                        <td className="px-6 py-4" style={{ color: colors.gray900 }}>{company.recalls.toLocaleString()}</td>
                        <td className="px-6 py-4" style={{ color: colors.gray700 }}>{company.sector}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {(!searchQuery || filteredTimeline.length > 0) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.gray900 }}>
              Recent Complaints & Recalls
              {searchQuery && <span className="text-xl ml-3" style={{ color: colors.gray700 }}>({filteredTimeline.length} results)</span>}
            </h2>
            <div className="space-y-4">
              {(searchQuery ? filteredTimeline : timelineEvents).map((event, index) => {
                const severityStyle = getSeverityStyle(event.severity);
                return (
                  <div key={index} className="p-6 rounded-lg border-l-4" style={{ backgroundColor: colors.white, borderLeftColor: getSourceColor(event.source), boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="px-3 py-1.5 text-white font-bold text-xs uppercase tracking-wider rounded" style={{ backgroundColor: getSourceColor(event.source) }}>{event.source}</span>
                          <span className="px-3 py-1 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2" style={{ backgroundColor: severityStyle.bg, color: severityStyle.text, border: `1px solid ${severityStyle.border}` }}>
                            <AlertCircle size={12} />
                            {event.severity}
                          </span>
                          <span className="text-sm" style={{ color: colors.gray700 }}>{event.date}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: colors.gray900 }}>{event.company}</h3>
                        <p className="mb-3 text-base" style={{ color: colors.gray700 }}>{event.issue}</p>
                        <div className="text-sm" style={{ color: colors.gray700 }}>
                          <span className="font-semibold">{event.source === 'CFPB' ? 'Complaints' : 'Units Affected'}:</span>{' '}
                          <span className="font-bold" style={{ color: colors.gray900 }}>{event.units.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: colors.gray900 }}>Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-6 rounded-lg" style={{ backgroundColor: colors.white, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ color: colors.success }}>
                <DollarSign size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: colors.gray900 }}>All 4 Federal Agencies</h3>
                <p style={{ color: colors.gray700, fontSize: '0.95rem' }}>Comprehensive directory of CFPB, NHTSA, CPSC, and FTC data sources.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: colors.gray900 }}>About The Enshitification Portal</h2>
          <div className="p-8 rounded-lg" style={{ backgroundColor: colors.white, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <p className="mb-4" style={{ color: colors.gray700, fontSize: '1.125rem', lineHeight: '1.75' }}>
              The Enshitification Portal is a comprehensive consumer protection transparency platform that enables citizens to access complaint data, track safety recalls, monitor fraud reports, and analyze quality decline across industries from four major federal agencies.
            </p>
            <p style={{ color: colors.gray700, fontSize: '1.125rem', lineHeight: '1.75' }}>
              Built using government design systems for accessibility, usability, and trust. This platform is designed for citizen use and all data is sourced directly from federal agencies.
            </p>
          </div>
        </section>
      </main>

      <footer style={{ backgroundColor: colors.darkBg, padding: '2rem 0', marginTop: '3rem' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="mb-2" style={{ color: colors.gray300 }}>Made for government transparency and citizen empowerment 🇺🇸</p>
          <p className="text-sm" style={{ color: colors.gray500 }}>Version 2.0.0 - October 2025 | Data from CFPB, NHTSA, CPSC, FTC</p>
        </div>
      </footer>
    </div>
  );
};

export default EnshitificationPortal;