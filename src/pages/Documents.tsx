import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageLayout, PageHeader } from '@/components/layout'
import { UserAvatar } from '@/components/common'
import { FileEdit, Calendar, Eye, Sparkles, FileText, MessageSquare, Code } from 'lucide-react'
import { mockDocuments } from '@/fixtures/documents'

const Documents = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting-notes':
        return <MessageSquare className="w-4 h-4" />
      case 'technical-spec':
        return <Code className="w-4 h-4" />
      case 'project-update':
        return <FileText className="w-4 h-4" />
      default:
        return <FileEdit className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting-notes':
        return 'bg-blue-100 text-blue-800'
      case 'technical-spec':
        return 'bg-purple-100 text-purple-800'
      case 'project-update':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <PageLayout>
      <PageHeader 
        title="문서" 
        subtitle="AI 기반 인사이트로 프로젝트 문서 작성 및 관리"
        actions={
          <Link to="/docs/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileEdit className="w-4 h-4 mr-2" />
              새 문서
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6">
        {mockDocuments.map((doc) => (
          <Card key={doc.id} className="bg-card border-border hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className={`${getTypeColor(doc.type)} text-xs`}>
                      {getTypeIcon(doc.type)}
                      <span className="ml-1 capitalize">{doc.type.replace('-', ' ')}</span>
                    </Badge>
                    {doc.aiAnalysis?.processed && (
                      <Badge variant="outline" className="text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI 분석 완료
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-card-foreground hover:text-primary cursor-pointer">
                    <Link to={`/docs/${doc.id}`}>
                      {doc.title}
                    </Link>
                  </CardTitle>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/docs/${doc.id}`}>
                    <Eye className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Content Preview */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {doc.content.substring(0, 200)}...
                </p>

                {/* AI Analysis Results */}
                {doc.aiAnalysis?.processed && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">AI Analysis Results</span>
                    </div>
                    <p className="text-xs text-blue-700 mb-2">{doc.aiAnalysis.summary}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="text-blue-600">
                        <strong>{doc.aiAnalysis.extractedActionItems}</strong>개 액션 아이템
                      </span>
                      <span className="text-green-600">
                        <strong>{doc.aiAnalysis.generatedIssues}</strong>개 이슈 생성
                      </span>
                      <span className="text-orange-600">
                        <strong>{doc.aiAnalysis.generatedReminders}</strong>개 알림 설정
                      </span>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <UserAvatar 
                      src={doc.createdBy.avatar} 
                      alt={doc.createdBy.username} 
                      size="xs"
                    />
                    <span>{doc.createdBy.username} 작성</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(doc.createdAt)}</span>
                  </div>
                </div>

                {/* Generated Issues Link */}
                {doc.generatedIssues && doc.generatedIssues.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">생성된 이슈:</span>
                    <div className="flex gap-1">
                      {doc.generatedIssues.map((issueId) => (
                        <Link 
                          key={issueId} 
                          to={`/issues/${issueId}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          #{issueId}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockDocuments.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="text-center py-12">
            <FileEdit className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">아직 문서가 없습니다</h3>
            <p className="text-muted-foreground mb-4">
              AI 기반 프로젝트 관리를 시작하려면 첫 번째 문서를 만들어보세요.
            </p>
            <Link to="/docs/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileEdit className="w-4 h-4 mr-2" />
                문서 만들기
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  )
}

export default Documents