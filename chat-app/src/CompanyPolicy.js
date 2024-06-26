import React, { useEffect, useState } from "react";

function CompanyPolicy() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/manual.html")
      .then((response) => response.text())
      .then((data) => setContent(data))
      .catch((error) => console.error("Error fetching the HTML file:", error));
  }, []);

  return (
    <div
      className="companyPolicy"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default CompanyPolicy;
