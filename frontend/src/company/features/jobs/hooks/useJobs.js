import { useState, useCallback, useEffect } from "react";
import { JobService } from "../services/job.service";

export function useJobs(companyId) {
  const [jobs, setJobs] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  const [filters, setFilters] = useState({
    search: "",
    department: "all",
    type: "all",
    experience: "all",
    status: "active",
  });

  const loadJobs = useCallback(
    async (isRefresh = false) => {
      if (!companyId) return;
      if (!isRefresh && (!hasMore || loading)) return;

      try {
        setLoading(true);
        if (isRefresh) setIsInitialLoad(true);

        const result = await JobService.getCompanyJobs(
          companyId,
          isRefresh ? null : lastDoc,
          filters
        );

        if (!result.success) throw new Error(result.message);

        setJobs((prev) => (isRefresh ? result.jobs : [...prev, ...result.jobs]));
        setLastDoc(result.lastDoc);
        setHasMore(result.hasMore);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    },
    [companyId, lastDoc, hasMore, loading, filters]
  );

  // Auto-refresh when filters change
  useEffect(() => {
    setJobs([]);
    setLastDoc(null);
    setHasMore(true);
    loadJobs(true);
  }, [filters]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilters((prev) => ({ ...prev, status: tab }));
  };

  return {
    jobs,
    loading,
    isInitialLoad,
    hasMore,
    activeTab,
    filters,
    setFilters,
    handleTabChange,
    loadJobs,
  };
}