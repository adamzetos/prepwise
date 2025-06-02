/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: StudentManagementPage
 * Purpose: Admin page for managing student accounts
 * Why Needed: Allows administrators to monitor and manage student access
 */

import { useState } from 'react';
import { AdminNavigation } from '../components/admin/AdminNavigation';
import { Footer } from '../components/landing/Footer';

interface Student {
  id: number;
  name: string;
  avatar: string;
  email: string;
  group: string;
  lastActive: string;
  interviewCount: number;
}

export function StudentManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;
  const totalStudents = 32;

  const students: Student[] = [
    {
      id: 1,
      name: 'Sophia Green',
      avatar: '/icons/Sophia_Green.svg',
      email: 'sophia.green@hec.edu.fr',
      group: 'Business',
      lastActive: '5 hours ago',
      interviewCount: 4
    },
    {
      id: 2,
      name: 'Liam Chen',
      avatar: '/icons/Liam_Chen.svg',
      email: 'liam.chen@hec.edu.fr',
      group: 'Business',
      lastActive: '5 hours ago',
      interviewCount: 7
    },
    {
      id: 3,
      name: 'Emma Johnson',
      avatar: '/icons/Emma_Johnson.png',
      email: 'emma.johnson@hec.edu.fr',
      group: 'Business',
      lastActive: '5 hours ago',
      interviewCount: 8
    },
    {
      id: 4,
      name: 'Hana Li',
      avatar: '/icons/Hana_Li.png',
      email: 'hana.li@hec.edu.fr',
      group: 'Business',
      lastActive: '5 hours ago',
      interviewCount: 23
    },
    {
      id: 5,
      name: 'Peter Hudson',
      avatar: '/icons/Peter_Hudson.png',
      email: 'peter.hudson@hec.edu.fr',
      group: 'Business',
      lastActive: '5 hours ago',
      interviewCount: 21
    },
    {
      id: 6,
      name: 'Raymond William',
      avatar: '/icons/Raymond_Williams.png',
      email: 'raymond.william@hec.edu.fr',
      group: 'Business',
      lastActive: '5 hours ago',
      interviewCount: 21
    },
    {
      id: 7,
      name: 'Sam Lundberg',
      avatar: '/icons/Sam_Lundberg.png',
      email: 'sam.lundberg@hec.edu.fr',
      group: 'Business',
      lastActive: '5 hours ago',
      interviewCount: 15
    }
  ];

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
  };

  const contentStyle = {
    flex: 1,
    padding: '3rem 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '3rem',
  };

  const titleSectionStyle = {
    flex: 1,
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '600',
    color: '#1a4d8c',
    marginBottom: '0.5rem',
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#6b7b8f',
  };

  const addButtonStyle = {
    backgroundColor: '#1a4d8c',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '40px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const tableContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
  };

  const thStyle = {
    padding: '1.25rem 1.5rem',
    textAlign: 'left' as const,
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a4d8c',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
  };

  const tdStyle = {
    padding: '1.25rem 1.5rem',
    fontSize: '14px',
    color: '#1f2d3d',
    borderBottom: '1px solid #f3f4f6',
  };

  const nameContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  };

  const emailStyle = {
    color: '#6b7b8f',
  };

  const groupSelectStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    color: '#1f2d3d',
    cursor: 'pointer',
    outline: 'none',
    width: '120px',
  };

  const actionButtonStyle = {
    color: '#1a4d8c',
    fontSize: '14px',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  };

  const paginationContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
  };

  const paginationInfoStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
  };

  const paginationButtonsStyle = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  };

  const pageButtonStyle = (isActive: boolean) => ({
    padding: '0.5rem 0.75rem',
    minWidth: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isActive ? '#1a4d8c' : 'transparent',
    color: isActive ? '#ffffff' : '#6b7b8f',
    border: isActive ? 'none' : '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  const arrowButtonStyle = {
    padding: '0.5rem',
    backgroundColor: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Get current page students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pageNumbers.push(
        <button
          key={i}
          style={pageButtonStyle(i === currentPage)}
          onClick={() => setCurrentPage(i)}
          onMouseEnter={(e) => {
            if (i !== currentPage) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (i !== currentPage) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div style={pageStyle}>
      <AdminNavigation />
      
      <div style={contentStyle}>
        <div style={headerStyle}>
          <div style={titleSectionStyle}>
            <h1 style={titleStyle}>Student Management</h1>
            <p style={subtitleStyle}>Monitor and manage student accounts</p>
          </div>
          
          <button
            style={addButtonStyle}
            onClick={() => console.log('Add Student clicked')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#163e70'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a4d8c'}
          >
            <img src="/icons/Add_Student.svg" alt="Add" style={{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }} />
            Add Student
          </button>
        </div>

        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Group</th>
                <th style={thStyle}>Last Active</th>
                <th style={thStyle}>Interview Count</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id}>
                  <td style={tdStyle}>
                    <div style={nameContainerStyle}>
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        style={avatarStyle}
                      />
                      <span style={{ fontWeight: '500' }}>{student.name}</span>
                    </div>
                  </td>
                  <td style={{ ...tdStyle, ...emailStyle }}>{student.email}</td>
                  <td style={tdStyle}>
                    <select 
                      style={groupSelectStyle}
                      defaultValue={student.group}
                      onChange={(e) => console.log('Group changed:', e.target.value)}
                    >
                      <option value="Business">Business</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Law">Law</option>
                      <option value="Medicine">Medicine</option>
                    </select>
                  </td>
                  <td style={tdStyle}>{student.lastActive}</td>
                  <td style={tdStyle}>{student.interviewCount}</td>
                  <td style={tdStyle}>
                    <button
                      style={actionButtonStyle}
                      onClick={() => console.log('Reset password for:', student.name)}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#163e70'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#1a4d8c'}
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={paginationContainerStyle}>
            <span style={paginationInfoStyle}>
              Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, totalStudents)} of {totalStudents} students
            </span>
            
            <div style={paginationButtonsStyle}>
              <button
                style={arrowButtonStyle}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="#6b7b8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {renderPageNumbers()}
              
              <button
                style={arrowButtonStyle}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="#6b7b8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}