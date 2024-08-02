// InterestCategoryDropdown.tsx

import React, { useState, useRef, useEffect } from "react";
import darkModeStore from "../../../stores/darkModeStore";

interface InterestProps {
  selectCategory: (category: string) => void;
}

const InterestCategoryDropdown: React.FC<InterestProps> = ({ selectCategory }) => {
  const [searchCategory, setSearchCategory] = useState<string>("관심사 선택");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDark = darkModeStore(state => state.isDark);

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const categories: { title: string; items: string[] }[] = [
    { 
      title: "프로그래밍 언어",
      items: ["Python", "JavaScript", "Java", "C#", "Ruby", "Go", "Swift", "Kotlin", "C++", "TypeScript"]
    },
    {
      title: "프레임워크 및 라이브러리",
      items: ["React", "Angular", "Vue.js", "Django", "Flask", "Spring", "Ruby on Rails", "ASP.NET", "TensorFlow", "PyTorch"]
    },
    {
      title: "데이터베이스",
      items: ["SQL", "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Cassandra", "Redis", "Firebase", "Oracle DB"]
    },
    {
      title: "클라우드 컴퓨팅",
      items: ["AWS (Amazon Web Services)", "Google Cloud Platform", "Microsoft Azure", "IBM Cloud", "Heroku", "DigitalOcean"]
    },
    {
      title: "DevOps 및 CI/CD",
      items: ["Docker", "Kubernetes", "Jenkins", "Travis CI", "CircleCI", "GitLab CI/CD", "Terraform", "Ansible", "Puppet"]
    },
    {
      title: "버전 관리 및 협업",
      items: ["Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Trello", "Confluence"]
    },
    {
      title: "모바일 개발",
      items: ["iOS Development", "Android Development", "React Native", "Flutter", "Xamarin", "SwiftUI"]
    },
    {
      title: "웹 개발",
      items: ["Frontend Development", "Backend Development", "Full Stack Development", "WebAssembly", "Progressive Web Apps (PWAs)"]
    },
    {
      title: "보안",
      items: ["Application Security", "Network Security", "Ethical Hacking", "Penetration Testing", "Secure Coding Practices", "GDPR & Privacy"]
    },
    {
      title: "소프트웨어 아키텍처 및 디자인 패턴",
      items: ["Microservices", "Monolithic Architecture", "Serverless Architecture", "Event-Driven Architecture", "Design Patterns (e.g., Singleton, Factory, Observer)"]
    },
    {
      title: "테스트 및 품질 보증",
      items: ["Unit Testing", "Integration Testing", "End-to-End Testing", "Test-Driven Development (TDD)", "Behavior-Driven Development (BDD)"]
    },
    {
      title: "인공지능 및 머신러닝",
      items: ["Machine Learning", "Deep Learning", "Natural Language Processing (NLP)", "Computer Vision", "AI Ethics"]
    },
    {
      title: "사물 인터넷 (IoT)",
      items: ["Embedded Systems", "Home Automation", "Wearable Technology", "Smart Cities"]
    },
    {
      title: "기타 기술 트렌드",
      items: ["Blockchain", "Cryptocurrency", "Quantum Computing", "Augmented Reality (AR)", "Virtual Reality (VR)", "Edge Computing"]
    },
    {
      title: "커뮤니티 및 학습 리소스",
      items: ["Online Courses (e.g., Coursera, Udemy, edX)", "Documentation and Guides", "Developer Communities (e.g., Stack Overflow, Reddit)", "Conferences and Meetups", "Technical Blogs and Podcasts"]
    },
  ];

  const handleCategory = (category: string) => {
    selectCategory(category);
    setSearchCategory(category);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="inline-block relative flex-grow" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="bg-base-100 border w-full hover:bg-black-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {searchCategory}
      </button>

      {isOpen && (
        <div className="absolute left-0 bottom-full mb-1 bg-base-100 divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 max-h-60 overflow-y-auto">
          {categories.map((category, index) => (
            <div key={index} className="py-2">
              <div className="sticky top-0 bg-base-200 px-4 py-2 font-bold">
                {category.title}
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {category.items.map((item) => (
                  <li key={item} onClick={() => handleCategory(item)}>
                    <div className={`${isDark && "text-gray-200"} text-center block px-4 py-2 hover:bg-gray-100`}>
                      {item}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterestCategoryDropdown;