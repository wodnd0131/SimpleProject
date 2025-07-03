import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { PageLayout, PageHeader } from '@/components/layout'
import { ArrowLeft, Save, FileEdit, Sparkles, CheckCircle, AlertCircle, Clock, X } from 'lucide-react'
import { mockDocumentTemplates } from '@/fixtures/documents'

const NewDocument = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [showAiAnalysis, setShowAiAnalysis] = useState(false)
  const navigate = useNavigate()

  const documentTypes = [
    { value: 'meeting-notes', label: '회의록', description: '회의 논의 및 액션 아이템 기록' },
    { value: 'project-update', label: '프로젝트 업데이트', description: '프로젝트 진행 상황 및 상태 공유' },
    { value: 'technical-spec', label: '기술 명세서', description: '기술 요구사항 및 설계 문서화' },
    { value: 'general', label: '일반 문서', description: '자유 형식 문서' }
  ]

  const commonTags = ['회의', '프로젝트-업데이트', '계획', '검토', '기술', '디자인', '개발', '테스트']

  const handleTemplateSelect = (templateId: string) => {
    const template = mockDocumentTemplates.find(t => t.id === templateId)
    if (template) {
      setContent(template.content)
      setSelectedType(templateId)
      if (!title) {
        setTitle(template.name)
      }
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove))
  }

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !selectedType) return

    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSaving(false)
    setShowAiAnalysis(true)
    
    // Auto-hide AI analysis after showing results
    setTimeout(() => {
      navigate('/docs')
    }, 5000)
  }

  const mockAiResults = {
    extractedActionItems: 4,
    generatedIssues: 3,
    generatedReminders: 2,
    summary: 'Document analyzed successfully. Found 4 action items and created 3 issues automatically.'
  }

  return (
    <PageLayout>
      <Link to="/docs">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          문서로 돌아가기
        </Button>
      </Link>
      
      <PageHeader 
        title="새 문서 작성" 
        titleSize="lg"
        size="md"
      />

      {showAiAnalysis && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Sparkles className="w-5 h-5" />
              AI 분석 완료
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-blue-700">{mockAiResults.summary}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>{mockAiResults.extractedActionItems}건의 액션 아이템 추출</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <span>{mockAiResults.generatedIssues}건의 이슈 생성</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{mockAiResults.generatedReminders}건의 알림 설정</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">생성된 이슈:</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• #101 - OAuth 2.0 인증 플로우 구현</li>
                  <li>• #102 - 대시보드 위젯 커스터마이제이션 패널 생성</li>
                  <li>• #103 - 자동화된 CI/CD 파이프라인 설정</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Document Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">문서 세부 사항</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-card-foreground">제목</Label>
                <Input
                  id="title"
                  placeholder="문서 제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-card-foreground">문서 유형</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="문서 유형 선택" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {documentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value} className="text-popover-foreground">
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-card-foreground">내용</Label>
                <Textarea
                  id="content"
                  placeholder="여기에 문서 내용을 작성하세요... 마크다운 포맷을 사용할 수 있습니다."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={15}
                  className="bg-input border-border text-foreground font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  마크다운 포맷을 지원합니다. 저장 후 AI가 자동으로 액션 아이템을 추출하고 이슈를 생성합니다.
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!title.trim() || !content.trim() || !selectedType || isSaving}
                >
                  {isSaving ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      AI로 처리 중...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      저장 및 분석
                    </>
                  )}
                </Button>
                <Link to="/docs">
                  <Button type="button" variant="outline">
                    취소
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Templates */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-card-foreground">템플릿</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockDocumentTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="w-full text-left p-3 rounded border border-border hover:bg-accent transition-colors"
                >
                  <div className="font-medium text-sm text-card-foreground">{template.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{template.description}</div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-card-foreground">태그</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="태그 추가"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="bg-input border-border text-foreground text-sm"
                />
                <Button size="sm" onClick={handleAddTag} disabled={!newTag.trim()}>
                  추가
                </Button>
              </div>
              
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">일반 태그:</p>
                <div className="flex flex-wrap gap-1">
                  {commonTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      disabled={selectedTags.includes(tag)}
                      className="text-xs px-2 py-1 rounded border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Features Info */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-card-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI 기능
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>저장 후 AI가 자동으로:</p>
              <ul className="space-y-1 ml-2">
                <li>• 내용에서 액션 아이템 추출</li>
                <li>• 개발 작업에 대한 이슈 생성</li>
                <li>• 팀 멤버에게 알림 설정</li>
                <li>• 프로젝트 일정 업데이트 식별</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}

export default NewDocument