import { Award, ShieldCheck, Trophy, Users, Sparkles } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const certificationsData = [
  {
    name: "Programming in Java",
    platform: "NPTEL",
    date: "April 2025",
    badge: "🏆 NPTEL Certified",
    description: "Demonstrated proficiency in Java programming, object-oriented concepts, exception handling, multithreading, and file input/output through academic evaluation.",
    link: "https://drive.google.com/file/d/1aJPUgGgo6RaC2DUl3RHD9XZVLvTEQR8D/view?usp=sharing",
    platformColor: "#B76E79", // Primary Rose Gold
    type: "certification",
    category: "certification"
  },
  {
    name: "Database Management Systems (DBMS)",
    platform: "NPTEL",
    date: "November 2025",
    badge: "🏆 NPTEL Certified",
    description: "Successfully completed the NPTEL course on Database Management Systems, covering SQL, normalization, transactions, indexing, query optimization, and database design principles.",
    link: "https://drive.google.com/file/d/19VxqA2vQAnB5lsITnWNQAb9nyiqSJCc9/view?usp=drive_link",
    platformColor: "#A65A67", // Deep Metallic Rose
    type: "certification",
    category: "certification"
  },
  {
    name: "Geodata Processing using Python and Machine Learning",
    platform: "Online Certification Program",
    date: "2026",
    badge: "🏆 Certificate of Merit",
    description: "Successfully completed training in geospatial data processing using Python and machine learning techniques, demonstrating practical knowledge of data analysis and intelligent geospatial applications.",
    link: "https://drive.google.com/file/d/10RzDR2KMM4AWL7tKPTY8HoeGKTR3xRDs/view?usp=drive_link",
    platformColor: "#8E4450", // Luxury Copper Rose
    type: "certification",
    category: "certification"
  },
  {
    name: "The Complete Course on Quantitative Aptitude",
    platform: "Udemy",
    date: "January 2026",
    badge: "🏆 Certified Course",
    description: "Completed comprehensive training in quantitative aptitude, including arithmetic, percentages, ratios, probability, logical reasoning, and analytical problem-solving techniques.",
    link: "https://drive.google.com/file/d/1liFo5bvarGuVRM0qLORpFf_Mw5DbUMW9/view?usp=drive_link",
    platformColor: "#B76E79", // Primary Rose Gold
    type: "certification",
    category: "certification"
  },
  {
    name: "Map2Impact Ideathon 2026",
    platform: "SRM Institute of Science and Technology",
    date: "2026",
    badge: "💡 Achievement",
    description: "Received a Certificate of Appreciation for participating in Map2Impact Ideathon 2026 at SRM SRM Institute of Science and Technology and contributing innovative ideas and problem-solving approaches.",
    link: "https://drive.google.com/file/d/1LrOxAjlMinbVVrFr3fWRJbKie8I03mDf/view?usp=drive_link",
    platformColor: "#A65A67", // Deep Metallic Rose
    type: "achievement",
    category: "activity"
  },
  {
    name: "Techno Conference 2026",
    platform: "NWC Association, SRM IST",
    date: "2026",
    badge: "🎓 Participation",
    description: "Received a Certificate of Participation for attending the Techno Conference organized by the NWC Association, Department of Networking and Communications at SRM Institute of Science and Technology.",
    link: "https://drive.google.com/file/d/1cU5LUcTDAmZHG5WATql3_WVlmb2Gi0Aq/view?usp=drive_link",
    platformColor: "#B76E79", // Primary Rose Gold
    type: "event",
    category: "activity"
  }
];

const CertCard = ({ cert, idx }) => {
  const revealRef = useIntersectionObserver({ threshold: 0.1 });
  const isActivity = cert.category === 'activity';

  const getCertIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <Trophy size={24} className="cert-award-icon" />;
      case 'event':
        return <Users size={24} className="cert-award-icon" />;
      default:
        return <Award size={24} className="cert-award-icon" />;
    }
  };

  return (
    <div 
      className={`glass-card cert-card reveal reveal-delay-${((idx % 2) + 1) * 100}`}
      ref={revealRef}
      style={{ '--cert-theme-color': cert.platformColor }}
    >
      {/* Corner Glowing Line */}
      <div className="cert-border-glow" aria-hidden="true"></div>

      <div className="cert-card-inner">
        {/* Platform & Badge Header */}
        <div className="cert-header">
          <div className={`cert-badge-premium ${isActivity ? 'badge-activity' : ''}`}>
            {isActivity ? (
              <Sparkles size={14} className="badge-shield-icon" />
            ) : (
              <ShieldCheck size={14} className="badge-shield-icon" />
            )}
            <span>{cert.badge}</span>
          </div>
          <span className="cert-date">{cert.date}</span>
        </div>

        {/* Main Card Content */}
        <div className="cert-content-body">
          {/* Certification Icon & Title */}
          <div className="cert-title-container">
            <div className="cert-icon-wrapper">
              {getCertIcon(cert.type)}
            </div>
            <div className="cert-info">
              <h3 className="cert-name">{cert.name}</h3>
              <p className="cert-platform">{cert.platform}</p>
            </div>
          </div>

          {/* Description text */}
          {cert.description && (
            <p className="cert-description">{cert.description}</p>
          )}
        </div>

        {/* Link Action */}
        <div className="cert-actions">
          <a 
            href={cert.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cert-view-btn shine-overlay"
            aria-label={`View certificate for ${cert.name}`}
          >
            <span>🔗 View Certificate</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Certifications() {
  const revealRef = useIntersectionObserver({ threshold: 0.1 });

  const certsList = certificationsData.filter(item => item.category === 'certification');
  const activitiesList = certificationsData.filter(item => item.category === 'activity');

  return (
    <section id="certifications" className="certifications-section">
      <div className="section-container">
        <div className="section-header reveal" ref={revealRef}>
          <span className="section-subtitle">Credentials & Achievements</span>
          <h2 className="section-title gradient-text">Certifications & Achievements</h2>
        </div>

        {/* Sub-category 1: Certifications */}
        <div className="cert-subcategory-wrapper reveal" ref={revealRef}>
          <h3 className="cert-subcategory-title">
            <span className="subcategory-icon">📜</span> Certifications
          </h3>
          <div className="certs-grid">
            {certsList.map((cert, idx) => (
              <CertCard key={idx} cert={cert} idx={idx} />
            ))}
          </div>
        </div>

        {/* Sub-category 2: Activities & Recognition */}
        <div className="cert-subcategory-wrapper reveal reveal-delay-200" ref={revealRef}>
          <h3 className="cert-subcategory-title">
            <span className="subcategory-icon">🏆</span> Activities & Recognition
          </h3>
          <div className="certs-grid">
            {activitiesList.map((cert, idx) => (
              <CertCard key={idx} cert={cert} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
